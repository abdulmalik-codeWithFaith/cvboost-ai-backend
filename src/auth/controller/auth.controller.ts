// import {
//   Body,
//   Controller,
//   HttpCode,
//   HttpStatus,
//   Post,
//   UseGuards,
// } from '@nestjs/common';
// import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
// import { AuthService } from '../service/auth.service';
// import { Public } from '../decorators/public.decorator';
// import { RegisterDto } from '../dto/register.dto';
// import { LoginDto } from '../dto/login.dto';
// import { JwtRefreshGuard } from '../guards/jwt-refresh.guard';
// import { CurrentUser } from '../decorators/current-user.decorator';
// import { RefreshTokenDto } from '../dto/refresh-token.dto';
// import { JwtAuthGuard } from '../guards/jwt-auth.guard';
// import { Throttle } from '@nestjs/throttler';

// @ApiTags('Auth')
// @Controller('auth')
// export class AuthController {
//   constructor(private readonly authService: AuthService) {}

//   @Public()
//   @Post('register')
//   @Throttle({ default: { ttl: 60000, limit: 5 } })
//   @ApiOperation({ summary: 'Register a new user' })
//   register(@Body() dto: RegisterDto) {
//     return this.authService.register(dto);
//   }

//   @Public()
//   @Post('login')
//   @HttpCode(HttpStatus.OK)
//   @Throttle({ default: { ttl: 60000, limit: 10 } })
//   @ApiOperation({ summary: 'Login with email and password' })
//   login(@Body() dto: LoginDto) {
//     return this.authService.login(dto);
//   }

//   @UseGuards(JwtRefreshGuard)
//   @Post('refresh')
//   @HttpCode(HttpStatus.OK)
//   @Throttle({ default: { ttl: 60000, limit: 20 } })
//   @ApiOperation({ summary: 'Refresh access token' })
//   refresh(
//     @CurrentUser() user: { id: string; email: string; refreshToken: string },
//     @Body() _dto: RefreshTokenDto, // validated by guard
//   ) {
//     return this.authService.refresh(user.id, user.email, user.refreshToken);
//   }

//   @UseGuards(JwtAuthGuard)
//   @Post('logout')
//   @HttpCode(HttpStatus.OK)
//   @ApiBearerAuth()
//   @Throttle({ default: { ttl: 60000, limit: 30 } })
//   @ApiOperation({ summary: 'Logout (revoke refresh token)' })
//   logout(@CurrentUser('id') userId: string, @Body() dto: RefreshTokenDto) {
//     return this.authService.logout(userId, dto.refreshToken);
//   }

//   @UseGuards(JwtAuthGuard)
//   @Post('logout-all')
//   @HttpCode(HttpStatus.OK)
//   @ApiBearerAuth()
//   @Throttle({ default: { ttl: 60000, limit: 10 } })
//   @ApiOperation({ summary: 'Logout from all devices' })
//   logoutAll(@CurrentUser('id') userId: string) {
//     return this.authService.logout(userId);
//   }
// }

// src/auth/auth.controller.ts — add these two endpoints

import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from '../service/auth.service';
import { Public } from '../decorators/public.decorator';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';
import { JwtRefreshGuard } from '../guards/jwt-refresh.guard';
import { CurrentUser } from '../decorators/current-user.decorator';
import { RefreshTokenDto } from '../dto/refresh-token.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { Throttle } from '@nestjs/throttler';
import { ForgotPasswordDto } from '../dto/forgot-password.dto';
import { ResetPasswordDto } from '../dto/reset-password.dto';
import { Request } from 'express';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  @Throttle({ default: { ttl: 60000, limit: 5 } })
  @ApiOperation({ summary: 'Register a new user' })
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { ttl: 60000, limit: 10 } })
  @ApiOperation({ summary: 'Login with email and password' })
  login(@Body() dto: LoginDto, @Req() req: Request) {
    return this.authService.login(dto, {
      ip: req.ip,
      device: req.headers['user-agent'],
    });
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { ttl: 60000, limit: 20 } })
  @ApiOperation({ summary: 'Refresh access token' })
  refresh(
    @CurrentUser() user: { id: string; email: string; refreshToken: string },
    @Body() _dto: RefreshTokenDto,
  ) {
    return this.authService.refresh(user.id, user.email, user.refreshToken);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { ttl: 60000, limit: 30 } })
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Logout (revoke refresh token)' })
  logout(@CurrentUser('id') userId: string, @Body() dto: RefreshTokenDto) {
    return this.authService.logout(userId, dto.refreshToken);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout-all')
  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { ttl: 60000, limit: 10 } })
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Logout from all devices' })
  logoutAll(@CurrentUser('id') userId: string) {
    return this.authService.logout(userId);
  }

  // ─── Password Reset Flow ────────────────────────────────────────────────────

  @Public()
  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { ttl: 60000, limit: 10 } })
  @ApiOperation({ summary: 'Request a password reset email' })
  forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.authService.forgotPassword(dto);
  }

  @Public()
  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { ttl: 60000, limit: 30 } })
  @ApiOperation({ summary: 'Reset password using token from email' })
  resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPassword(dto);
  }
}
