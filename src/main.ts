import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';

async function mainInit() {
  const app = await NestFactory.create(AppModule, {
    // Logger Option
    logger: process.env.NODE_ENV === 'production'
    ? ['error', 'warn', 'log']
    : ['error', 'warn', 'log', 'verbose', 'debug']
    // logger: false,
  });
  // 
  const configService = app.get(ConfigService);


  // // ENV 파일 확인
  // if(process.env.NODE_ENV === 'development'){
  //   // console.log(__dirname)
  //   console.log('ENV_FILE : ' + process.env.NODE_ENV);
  //   console.log('RUN : ' + process.env.RUN_SYSTEM);
  // }else{
  //   console.log('ENV_FILE : ' + process.env.NODE_ENV);
  //   console.log('RUN : ' + process.env.RUN_SYSTEM);
  // };
  
  // class-transformer 적용
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
  }));

  app.use(cookieParser());
  await app.listen(3000);
}

mainInit();
