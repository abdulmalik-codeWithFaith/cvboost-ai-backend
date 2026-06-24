import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtPayload } from '../strategies/jwt.strategy';
import { PrismaService } from '@/prisma/service/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { RegisterDto } from '../dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from '../dto/login.dto';
import { ResetPasswordDto } from '../dto/reset-password.dto';
import { ForgotPasswordDto } from '../dto/forgot-password.dto';
import * as crypto from 'crypto';
import { Prisma } from '@prisma/client';

interface LoginMetadata {
  ip?: string;
  device?: string;
  userAgent?: string;
}

@Injectable()
export class AuthService {
  private readonly SALT_ROUNDS = 12;
  private readonly REFRESH_TOKEN_TTL_DAYS = 7;

  constructor(
    private readonly db: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.db.user.findUnique({
      where: { email: dto.email },
    });
    if (existing) throw new ConflictException('Email already in use');

    const hashedPassword = await bcrypt.hash(dto.password, this.SALT_ROUNDS);

    const user = await this.db.user.create({
      data: {
        email: dto.email,
        password: hashedPassword,
        firstName: dto.firstName,
        lastName: dto.lastName,
        profile: { create: {} },
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        createdAt: true,
      },
    });

    const tokens = await this.generateAndStoreTokens(
      user.id,
      user.email,
      user.role,
    );
    return { user, ...tokens };
  }

  async login(dto: LoginDto, metadata?: LoginMetadata) {
    const user = await this.db.user.findUnique({
      where: { email: dto.email },
      select: {
        id: true,
        email: true,
        password: true,
        firstName: true,
        lastName: true,
        role: true,
      },
    });

    if (!user || !user.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatch = await bcrypt.compare(dto.password, user.password);
    if (!passwordMatch) throw new UnauthorizedException('Invalid credentials');

    const { password: _, ...safeUser } = user;
    const tokens = await this.generateAndStoreTokens(
      user.id,
      user.email,
      user.role,
    );

    if (metadata) {
      const metadataJson: Prisma.JsonObject = {
        ip: metadata.ip || null,
        device: metadata.device || null,
        userAgent: metadata.userAgent || null,
        timestamp: new Date().toISOString(),
      };

      await this.db.activityLog
        .create({
          data: {
            userId: user.id,
            action: 'LOGIN',
            metadata: metadataJson,
          },
        })
        .catch(() => {});
    }

    return { user: safeUser, ...tokens };
  }

  async forgotPassword(dto: ForgotPasswordDto) {
    const user = await this.db.user.findUnique({
      where: { email: dto.email },
      select: { id: true, email: true, firstName: true },
    });

    // Always respond success — prevents email enumeration
    if (!user)
      return { message: 'If that email exists, a reset link has been sent.' };

    // Invalidate any existing unused reset tokens
    await this.db.passwordResetToken.updateMany({
      where: { userId: user.id, used: false },
      data: { used: true },
    });

    const rawToken = crypto.randomBytes(32).toString('hex');
    const expiresMin = this.configService.get<number>(
      'PASSWORD_RESET_EXPIRES_MIN',
      15,
    );
    const expiresAt = new Date(Date.now() + expiresMin * 60 * 1000);

    await this.db.passwordResetToken.create({
      data: { userId: user.id, token: rawToken, expiresAt },
    });

    // TODO: plug mail back in here — this.mailService.sendForgotPassword(...)
    return {
      message: 'If that email exists, a reset link has been sent.',
      debug_token: rawToken,
    };
  }

  async resetPassword(dto: ResetPasswordDto) {
    const record = await this.db.passwordResetToken.findUnique({
      where: { token: dto.token },
      include: { user: { select: { id: true, email: true, firstName: true } } },
    });

    if (!record || record.used || record.expiresAt < new Date()) {
      throw new BadRequestException('Reset token is invalid or has expired');
    }

    const hashedPassword = await bcrypt.hash(dto.newPassword, this.SALT_ROUNDS);

    await this.db.$transaction([
      this.db.user.update({
        where: { id: record.userId },
        data: { password: hashedPassword },
      }),
      this.db.passwordResetToken.update({
        where: { id: record.id },
        data: { used: true },
      }),
      // Invalidate ALL refresh tokens — force re-login everywhere
      this.db.refreshToken.deleteMany({ where: { userId: record.userId } }),
    ]);

    return {
      message:
        'Password reset successfully. Please log in with your new password.',
    };
  }

  async refresh(userId: string, email: string, rawRefreshToken: string) {
    // Old token already validated in strategy — rotate it
    await this.db.refreshToken.deleteMany({
      where: { userId, token: rawRefreshToken },
    });

    const user = await this.db.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, role: true },
    });

    if (!user) throw new UnauthorizedException();

    return this.generateAndStoreTokens(user.id, user.email, user.role);
  }

  async logout(userId: string, refreshToken?: string) {
    if (refreshToken) {
      await this.db.refreshToken.deleteMany({
        where: { userId, token: refreshToken },
      });
    } else {
      // Logout from all devices
      await this.db.refreshToken.deleteMany({ where: { userId } });
    }
  }

  // ─── Private helpers ──────────────────────────────────────────────────────────

  private async generateAndStoreTokens(
    userId: string,
    email: string,
    role: string,
  ) {
    const payload: JwtPayload = { sub: userId, email, role };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.getOrThrow('JWT_SECRET'),
        expiresIn: this.configService.get('JWT_EXPIRES_IN', '15m'),
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.getOrThrow('JWT_REFRESH_SECRET'),
        expiresIn: `${this.REFRESH_TOKEN_TTL_DAYS}d`,
      }),
    ]);

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + this.REFRESH_TOKEN_TTL_DAYS);

    await this.db.refreshToken.create({
      data: { userId, token: refreshToken, expiresAt },
    });

    // Prune expired tokens for this user (housekeeping)
    await this.db.refreshToken
      .deleteMany({ where: { userId, expiresAt: { lt: new Date() } } })
      .catch(() => {});

    return { accessToken, refreshToken };
  }
}
