import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    LoggerModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true, // This makes ConfigService available everywhere
      envFilePath: '.env', // Path to your .env file if you have one
    }),
    PrismaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
