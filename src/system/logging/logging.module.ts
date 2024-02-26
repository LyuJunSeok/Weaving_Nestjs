import { Global, Logger, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './logging.interceptor';

@Global()
@Module({
  providers: [
    Logger,
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
  ],
})
export class LoggingModule { }
