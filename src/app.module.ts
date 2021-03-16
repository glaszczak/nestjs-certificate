import * as Joi from '@hapi/joi'
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { CoffeeRatingModule } from './coffee-rating/coffee-rating.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot(
      {
        envFilePath: ['.environment', '.env.db'],
        validationSchema: Joi.object({
          DATABASE_HOST: Joi.required(),
          DATABASE_PORT: Joi.number().default(5432),
        }),
      },
      
    ),
    CoffeesModule, TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT,
    username: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE_NAME,
    autoLoadEntities: true,
    synchronize: true // (recommended: disable in the production)!!!
  }), CoffeeRatingModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
