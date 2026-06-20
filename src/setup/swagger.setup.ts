import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export function swaggerSetup(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('Cv-Boost-ai service example')
    .setDescription('The Cv-Boost-ai service API description')
    .setVersion('1.0')
    .addTag('Cv-Boost-ai service')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        name: 'JWT-auth',
        description: 'Enter JWT token',
        bearerFormat: 'JWT',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  if (process.env.NODE_ENV !== 'production')
    SwaggerModule.setup('api/docs', app, documentFactory, {
      swaggerOptions: {
        persistAuthorization: true, // Persist auth across refreshes
        securityDefinitions: {
          JWT: {
            type: 'apiKey', // Security definition type
            in: 'header', // Token location
            name: 'Authorization', // Header name
          },
        },
      },
    });
}
