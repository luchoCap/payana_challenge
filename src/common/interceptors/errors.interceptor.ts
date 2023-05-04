import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ExceptionService } from '../exception.service';

@Injectable()
export class ErrorsInterceptor
  extends ExceptionService
  implements NestInterceptor
{
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        return this.handleExceptions(err);
      }),
    );
  }
}
