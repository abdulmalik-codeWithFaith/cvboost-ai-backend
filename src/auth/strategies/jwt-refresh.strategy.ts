import { PrismaService } from '@/prisma/service/prisma.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly db: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow<string>('JWT_REFRESH_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: { sub: string; email: string }) {
    const rawToken = req.body?.refreshToken;
    if (!rawToken) throw new UnauthorizedException('Refresh token missing');

    const stored = await this.db.refreshToken.findFirst({
      where: {
        userId: payload.sub,
        token: rawToken,
        expiresAt: { gt: new Date() },
      },
    });

    if (!stored)
      throw new UnauthorizedException('Refresh token invalid or expired');

    return { id: payload.sub, email: payload.email, refreshToken: rawToken };
  }
}
