import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoggerService } from 'src/logger/logger.service';

@Injectable()
export class LoggerHttpInterceptor implements NestInterceptor {
  constructor(private readonly loggerService: LoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();
    const response = httpContext.getResponse();
    const { url, body, query } = request;

    return next.handle().pipe(
      tap((data) => {
        this.loggerService.log(
          `[Request] url: ${url}, body: ${JSON.stringify(
            body,
          )}, query: ${JSON.stringify(query)}`,
        );
        this.loggerService.log(
          `[Response] statusCode: ${
            response.statusCode
          }, data: ${JSON.stringify(data)}`,
        );
      }),
    );
  }
}
