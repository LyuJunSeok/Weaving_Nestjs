import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `Hello World! ${process.env.RUN_SYSTEM}`;
  }

  postHello(): string {
    return 'Hello Post';
  }
}
