import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { loggerConfig } from './setup/config/logger.config';

import { CvModule } from './cv/cv.module';
import { UserModule } from './user/user.module';


@Module({
  imports: [
    LoggerModule.forRoot(loggerConfig),

    ConfigModule.forRoot({
      isGlobal: true, // This makes ConfigService available everywhere
      envFilePath: '.env', // Path to your .env file if you have one
    }),
    PrismaModule,
    AuthModule,
    CvModule,
      UserModule,

  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
