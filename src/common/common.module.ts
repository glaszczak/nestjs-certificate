import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { RequestMethod } from '@nestjs/common/enums/request-method.enum';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ApiKeyGuard } from './guards/api-key.guard';
import { LoggingMiddleware } from './middleware/logging.middleware';

@Module({
  imports: [ConfigModule],
  providers: [{provide: APP_GUARD, useClass: ApiKeyGuard}]
})
export class CommonModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*')
    // consumer.apply(LoggingMiddleware).forRoutes('coffees') // only for 'coffees' route
    // consumer.apply(LoggingMiddleware).forRoutes({ path: 'coffees', method: RequestMethod.GET}) // using RequestMethod enum
    // consumer.apply(LoggingMiddleware).exclude('coffees').forRoutes('*') // exclude only 'coffees' route
  }
}
