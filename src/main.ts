import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupLogger } from './setup/logger.setup';
import { swaggerSetup } from './setup/swagger.setup';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  //using the app logger
  const logger = setupLogger(app);
  swaggerSetup(app);

  //built-in validation

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3001);

  await app.listen(port);
  const url = await app.getUrl();
  logger.log(`Application is running on: ${url}`);
  logger.log(`Swagger documentation: ${url}/api/docs`);
}
bootstrap();
