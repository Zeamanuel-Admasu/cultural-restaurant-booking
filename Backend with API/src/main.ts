import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.enableCors({
    origin: 'http://localhost/5000',
    credentials: true
  })
  app.use("/js",express.static(join(__dirname, '..', 'src/public/js')));
  app.use("/css",express.static(join(__dirname, '..', 'src/public/css')));
  app.use(cookieParser());


  await app.listen(5000);
}
bootstrap();
