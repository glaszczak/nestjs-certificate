import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class WrapResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');

    // // http://localhost:3000/coffees/4
    // return next.handle().pipe(tap(data => console.log('After,,, ', data)));

    return next.handle().pipe(map(data => ({ data }))); // wrap into data object
  }
}
