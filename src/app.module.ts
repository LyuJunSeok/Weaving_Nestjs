import { UserModule } from './common/user/user.module';
import { MenuModule } from './home/menu/menu.module';
import { AuthModule } from './system/auth/auth.module';
import { SignInModule } from './home/signin/signin.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as oracledb from 'oracledb';
import { DataSource } from 'typeorm';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { oraORMConfig } from './config/orm.config';
import { validationSchema } from './config/validationSchema';

import { LoggingModule } from './system/logging/logging.module';
import { ZTestModule } from './zTest/ztest.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

//oracle client 실행
oracledb.initOracleClient();

// ENV 환경 체크
console.log('ENV : ' + process.env.NODE_ENV);
// 소스 주소 체크
// console.log('Current working directory : ' + process.cwd());
@Module({
  imports: [
    // Database
    // TypeOrmModule.forRoot(oraORMConfig),       // Oracle TypeORM 설정 파일 연결
    // TypeOrmModule.forRoot(),                   // MS-SQL TypeORM 설정 파일 연결

    // 비동기 구성
    TypeOrmModule.forRootAsync({
      name: 'default',
      useFactory: async () => {
        return {
          type: process.env.MAIN_DATABASE_TYPE,
          host: process.env.MAIN_DATABASE_HOST,
          port: process.env.MAIN_DATABASE_PORT,
          sid: process.env.MAIN_DATABASE_SID,
          username: process.env.MAIN_DATABASE_USERNAME,
          password: process.env.MAIN_DATABASE_PASSWORD,
          database: process.env.MAIN_DATABASE_NAME,
          // Entities
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          dropSchema: false,
          // Auto-create database tables
          synchronize: true,
          migrationsRun: false,
          logging: false, // Enable SQL query logging (helpful for debugging)
        } as TypeOrmModuleAsyncOptions;
      },
    }),

    // Base Config
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.cwd()}/envs/.${process.env.NODE_ENV}.env`
      // envFilePath: [`${__dirname}/config/env/.${process.env.NODE_ENV}.env`],
    }),

    // Common
    LoggingModule,
 
    

    // Basic Module(Common, Home)
    AuthModule,
    SignInModule,
    MenuModule,
    UserModule,

    // DM Module


    // DA Module



    // Test
    ZTestModule
  ],

  controllers: [
    AppController
  ],

  providers: [
    AppService
  ],
})
export class AppModule {
  constructor(
    private dataSource: DataSource
  ) { }
}
