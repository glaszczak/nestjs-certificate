import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter<T extends HttpException>
  implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();
    const error =
      typeof response === 'string'
        ? { message: exceptionResponse }
        : (exceptionResponse as object);
    
    // check it with request to: http://localhost:3000/incorrectResource => return {"error": "Not Found","timestamp": "2021-03-16T15:49:00.662Z"}
    response.status(status).json({
      ...error,
      timestamp: new Date().toISOString()
    })

  }
}
