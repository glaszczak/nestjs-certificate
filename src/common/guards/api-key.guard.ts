import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';


@Injectable()
export class ApiKeyGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const authHeader = request.header('Authorization');

    // check it with request to any endpoint using Header: Authorization, value: process.env.API_KEY
    return authHeader === process.env.API_KEY;
  }
}
