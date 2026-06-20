import { INestApplication } from '@nestjs/common';
import { Logger } from 'nestjs-pino';

export function setupLogger(app: INestApplication): Logger {
  const logger = app.get(Logger);
  app.useLogger(logger);

  return logger;
}
