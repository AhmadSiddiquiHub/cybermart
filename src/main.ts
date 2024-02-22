// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(3000);
// }
// bootstrap();

import { NestFactory } from '@nestjs/core';
// import { MicroserviceOptions, Transport } from '@nestjs/microservices';
// import RedisClient from 'ioredis';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import { ValidationPipe } from '@nestjs/common';
// import { DBSource } from './database';
import { join } from 'path';
// import Redis from 'ioredis';

import * as dotenv from 'dotenv';
import { ValidationExceptionFilter } from './utils/validationPipeFilter';
dotenv.config();

async function bootstrap() {
  // Create an HTTP Express instance to handle HTTP requests
  const httpApp = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  httpApp.setGlobalPrefix('api/seller');
  httpApp.setBaseViewsDir(join(__dirname, '../', 'views'));
  httpApp.setViewEngine('hbs');
  httpApp.use(
    morgan(':method :url :status :res[content-length] - :response-time ms'),
  );

  httpApp.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  httpApp.useGlobalFilters(new ValidationExceptionFilter());

  await httpApp.listen(process.env.APP_PORT || 4020);
  console.log(`HTTP server running on PORT = ${process.env.APP_PORT}`);
}
bootstrap();



