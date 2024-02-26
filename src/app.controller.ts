import { Controller, Get, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  // constructor(private configService: ConfigService) {}

  @Get()
  getHello(): string {
    // const message = this.configService.get('ORACLE_DATABASE_SID');
    console.log(`123`)
    // return message;
    // return process.env.RUN_SYSTEM;
    return this.appService.getHello();

  }  
}
