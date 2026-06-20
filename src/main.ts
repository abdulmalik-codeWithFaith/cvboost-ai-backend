import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupLogger } from './setup/logger.setup';
import { swaggerSetup } from './setup/swagger.setup';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  //using the app logger
  const logger = setupLogger(app);
  swaggerSetup(app);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3001);

  await app.listen(port);
  const url = await app.getUrl();
  logger.log(`Application is running on: ${url}`);
  logger.log(`Swagger documentation: ${url}/api/docs`);
}
bootstrap();
