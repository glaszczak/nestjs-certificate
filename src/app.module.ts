import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';

@Module({
  imports: [CoffeesModule, TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres', // grzegorzlaszczak?!?
    password: 'password',
    database: 'postgres',
    autoLoadEntities: true,
    synchronize: true // (recommended: disable in the production)!!!
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}