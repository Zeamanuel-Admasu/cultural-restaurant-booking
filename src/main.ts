import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.useStaticAssets(join(__dirname, '..', 'dist'));

  app.enableCors({
    origin: 'http://localhost/5000',
    credentials: true
  })


  app.use(express.static(join(__dirname, '..', 'src/public')));
  app.use(express.static(join(__dirname, '..', 'dist/public')));


  app.use("/js",express.static(join(__dirname, '..', 'src/public/js')));
  
  app.use("/js",express.static(join(__dirname, '..', 'dist/public/js')));


  app.use(cookieParser());


  await app.listen(5000);
}
bootstrap();
