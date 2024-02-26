import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger, Inject } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private logger: Logger) { }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const { method, url, body } = context.getArgByIndex(0);
    this.logger.log(`[Weaving] Request ${method} : ${url}`);

    return next
      .handle()
      .pipe(
        tap(data => this.logger.log(`[Weaving] Response ${method} : ${url} \n response: ${JSON.stringify(data)}`))
      );
  }
}