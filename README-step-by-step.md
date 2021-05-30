# Getting Started

```bash
# Detect what version of Node is installed
node --version

# Install NestJS CLI -globally
npm i -g @nestjs/cli

# Check your Nest version (once installed)
nest --version

# 💡TIP💡 Output all Nest commands
nest --help

# Create the Application
nest new app-name

# Start Nest application
npm run start

/** 
 * Project available at PORT 3000 
 * http://localhost:3000
 */
```

# Creating a REST API application

```bash
 # Development mode:
$ npm run start:dev

# Generate a Controller
$ nest generate controller
# shorthand: $ nest g co
```

## CoffeesController FINAL CODE
```ts
import { Controller, Get } from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
  @Get()
  findAll() {
    return 'This action returns all coffees';
  }
}
```

## Use Route Parameters

```ts
/* CoffeesController FINAL CODE */
import { Controller, Get, Param } from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
  @Get()
  findAll() {
    return 'This action returns all coffees';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns #${id} coffee`;
  }
}
```

## Handling Request Body / Payload
```ts
/* CoffeesController FINAL CODE */
import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
  @Get()
  findAll() {
    return 'This action returns all coffees';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns #${id} coffee`;
  }

  @Post()
  create(@Body() body) {
    return body;
    // return `This action creates a coffee`;
  }
}
```

## Handling Update and Delete Requests
```ts
/* CoffeesController FINAL CODE */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
  @Get()
  findAll() {
    return 'This action returns all coffees';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns #${id} coffee`;
  }

  @Post()
  create(@Body() body) {
    return body;
    // return `This action creates a coffee`;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body) {
    return `This action updates #${id} coffee`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes #${id} coffee`;
  }
```

## Implement Pagination with Query Parameters
```ts
/* CoffeesController FINAL CODE */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
  @Get()
  findAll(@Query() paginationQuery) {
    const { limit, offset } = paginationQuery;
    return `This action returns all coffees. Limit ${limit}, offset: ${offset}`;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns #${id} coffee`;
  }

  @Post()
  create(@Body() body) {
    return body;
    // return `This action creates a coffee`;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body) {
    return `This action updates #${id} coffee`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes #${id} coffee`;
  }
}
```

## Creating a Basic Service
```ts
// Generate a Service with the Nest CLI
nest generate service {name}
// shorthand: nest g s {name}

/* CoffeesService FINAL CODE */
import { Injectable } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
  private coffees: Coffee[] = [
    {
      id: 1,
      name: 'Shipwreck Roast',
      brand: 'Buddy Brew',
      flavors: ['chocolate', 'vanilla'],
    },
  ];

  findAll() {
    return this.coffees;
  }

  findOne(id: string) {
    return this.coffees.find(item => item.id === +id);
  }

  create(createCoffeeDto: any) {
    this.coffees.push(createCoffeeDto);
  }

  update(id: string, updateCoffeeDto: any) {
    const existingCoffee = this.findOne(id);
    if (existingCoffee) {
      // update the existing entity
    }
  }

  remove(id: string) {
    const coffeeIndex = this.coffees.findIndex(item => item.id === +id);
    if (coffeeIndex >= 0) {
      this.coffees.splice(coffeeIndex, 1);
    }
  }
}

/* Coffee Entity FINAL CODE */
export class Coffee {
  id: number;
  name: string;
  brand: string;
  flavors: string[];
}

/* CoffeesController FINAL CODE */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}

  @Get()
  findAll(@Query() paginationQuery) {
    // const { limit, offset } = paginationQuery;
    return this.coffeesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coffeesService.findOne(id);
  }

  @Post()
  create(@Body() body) {
    return this.coffeesService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body) {
    return this.coffeesService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coffeesService.remove(id);
  }
}
```

## Send User-Friendly Error Messages
```ts
/* CoffeesService FINAL CODE */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
  private coffees: Coffee[] = [
    {
      id: 1,
      name: 'Shipwreck Roast',
      brand: 'Buddy Brew',
      flavors: ['chocolate', 'vanilla'],
    },
  ];

  findAll() {
    return this.coffees;
  }

  findOne(id: string) {
    const coffee = this.coffees.find(item => item.id === +id);
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return coffee;
  }

  create(createCoffeeDto: any) {
    this.coffees.push(createCoffeeDto);
  }

  update(id: string, updateCoffeeDto: any) {
    const existingCoffee = this.findOne(id);
    if (existingCoffee) {
      // update the existing entity
    }
  }

  remove(id: string) {
    const coffeeIndex = this.coffees.findIndex(item => item.id === +id);
    if (coffeeIndex >= 0) {
      this.coffees.splice(coffeeIndex, 1);
    }
  }
}
```

## Encompass Business-Domain in Modules
Nest Modules contain 4 main things:

**controllers** - Which you can think of as our API Routes, that we want this module to instantiate.

**exports** - Here we can list providers within this current module that should be made available anywhere this module is imported

**imports** - Just as we saw in the AppModule, the imports Array gives us the ability to list OTHER modules that THIS module requires. Any exported providers of these imported modules are now fully available here as well.

**providers** - Here we’re going to list our services that need to be instantiated by the Nest injector.  Any providers here will be available only within “THIS” module itself, unless added to the exports array we saw above.

```ts
// Generate a Nest Module with the Nest CLI
nest g module {name}
// shorthand: nest g mo {name}

/* CoffeesModule FINAL CODE */
import { Module } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';

@Module({ 
  controllers: [CoffeesController],
  providers: [CoffeesService] 
})
export class CoffeesModule {}
```

## Introduction to Data Transfer Objects
```ts
/**
 * Generate a DTO class with the Nest CLI 
 * --no-spec (no test file needed for DTO's)
 */
nest g class coffees/dto/create-coffee.dto --no-spec

/* CreateCoffeeDto */
export class CreateCoffeeDto {
  readonly name: string;
  readonly brand: string;
  readonly flavors: string[];
}

/* UpdateCoffeeDto */
export class UpdateCoffeeDto {
  readonly name?: string;
  readonly brand?: string;
  readonly flavors?: string[];
}
```

## Validate Input Data with Data Transfer Objects

The **ValidationPipe** provides a convenient way of enforcing validation rules for all incoming client payloads. You can specify these rules by using simple annotations in your DTO!

```ts
// Apply the ValidationPipe globally in our main.ts file
app.useGlobalPipes(new ValidationPipe());

// Install needed dependencies
npm i class-validator class-transformer 

// Implement validation rules in our CreateCoffeeDto
import { IsString } from 'class-validator';

export class CreateCoffeeDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly brand: string;

  @IsString({ each: true })
  readonly flavors: string[];
}

// Install @nestjs/mapped-types 
npm i @nestjs/mapped-types

/* UpdateCoffeeDto - FINAL CODE  */
import { PartialType } from '@nestjs/mapped-types';
import { CreateCoffeeDto } from './create-coffee.dto';

export class UpdateCoffeeDto extends PartialType(CreateCoffeeDto) {}
```

## Handling Malicious Request Data
```ts
/* Enabling "whitelist" feature of ValidationPipe */
app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // 👈
}));

/* Throw errors when whitelisted properties are found */
app.useGlobalPipes(new ValidationPipe({
   forbidNonWhitelisted: true, // 👈
   whitelist: true,
}));
```

## Auto-transform Payloads to DTO instances
```ts
// Enabling auto transform feature of ValidationPipe
app.useGlobalPipes(
  new ValidationPipe({
    transform: true, // 👈
  }),
);
```

# Add PostgreSQL with TypeORM (with Docker)

## Running PostgreSQL with Docker

### YAML docker-compose.yml configuration file
```yml
version: "3"
services:
  db:
    image:  postgres
    restart: always 
    ports:
      - "5432:5432"
    environment:
       POSTGRES_PASSWORD: pass123
```

### Running container
```bash
# Start containers in detached / background mode
docker-compose up -d

# Stop containers
docker-compose down
```

## Introducing the TypeORM Module
```bash
# Install neccessary TypeORM dependencies
npm install @nestjs/typeorm typeorm pg
```

```ts
/* AppModule - FINAL CODE */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';

@Module({
  imports: [
    CoffeesModule,
    TypeOrmModule.forRoot({
      type: 'postgres', // type of our database
      host: 'localhost', // database host
      port: 5432, // database host
      username: 'postgres', // username
      password: 'pass123', // user password
      database: 'postgres', // name of our database,
      autoLoadEntities: true, // models will be loaded automatically 
      synchronize: true, // your entities will be synced with the database(recommended: disable in prod)
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

## Creating a TypeORM Entity
```ts
/* Coffee Entity - FINAL CODE */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity() // sql table === 'coffee'
export class Coffee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  brand: string;

  @Column('json', { nullable: true })
  flavors: string[];
}

/* CoffeesModule - FINAL CODE */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Coffee])], // 👈 Adding Coffee Entity here to TypeOrmModule.forFeature
  controllers: [CoffeesController],
  providers: [CoffeesService],
})
export class CoffeesModule {}
```

## Using Repository to Access Database
```ts
/* 
 CoffeesService - FINAL CODE
 Implementing TypeORM "Repository"
*/

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
  ) {}

  findAll() {
    return this.coffeeRepository.find();
  }

  async findOne(id: string) {
    const coffee = await this.coffeeRepository.findOne(id);
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return coffee;
  }

  create(createCoffeeDto: CreateCoffeeDto) {
    const coffee = this.coffeeRepository.create(createCoffeeDto);
    return this.coffeeRepository.save(coffee);
  }

  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    const coffee = await this.coffeeRepository.preload({
      id: +id,
      ...updateCoffeeDto,
    });
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return this.coffeeRepository.save(coffee);
  }

  async remove(id: string) {
    const coffee = await this.findOne(id);
    return this.coffeeRepository.remove(coffee);
  }
}
```

## Create a Relation between two Entities

**Relations** are associations established between two or more tables, based on common fields from each table, often involving primary and foreign keys.

There are three types of relations:

**One-to-one**

The first are one-to-one relations. In these relations every row in the primary table has one - and only one associated row in the foreign table. In TypeOrm, we define these types of relations with the @OneToOne() decorator.

**One-to-many** or **Many-to-one** relations

For these relations - every row in the primary table has one or more related rows in the foreign table. In TypeOrm, we define these types of relations with the  @OneToMany() and @ManyToOne() decorators.

**Many-to-many** relations

This is when every row in the primary table has many related rows in the foreign table, and every record in the foreign table has many related rows in the primary table. In TypeOrm, we define these types of relations with the  @ManyToMany() decorator.

```ts
/* Coffee Entity - FINAL CODE */
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Flavor } from './flavor.entity';

@Entity() // sql table === 'coffee'
export class Coffee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  brand: string;

  @JoinTable() // 👈 Join the 2 tables - only the OWNER-side does this
  @ManyToMany(
    type => Flavor,
    flavor => flavor.coffees, // what is "coffee" within the Flavor Entity 
  ) // 👈
  flavors: string[];
}

/* Flavor Entity - FINAL CODE */
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Coffee } from './coffee.entity';

@Entity()
export class Flavor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany( 
    type => Coffee,
    coffee => coffee.flavors, // what is "flavor" within the Coffee Entity 
  ) // 👈
  coffees: Coffee[];
}
```

## Retrieve Entities with their Relations
```ts
/** 
 * Passing in find options to TypeORM, in our case we need to 
 * pass "relations" with an Array of Strings 
  
 * For example: 
 */
return this.coffeeRepository.find({
  relations: ['flavors'], // 👈
});

/* CoffeesService - FINAL CODE */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
  ) {}

  findAll() {
    return this.coffeeRepository.find({
      relations: ['flavors'],
    });
  }

  async findOne(id: string) {
    const coffee = await this.coffeeRepository.findOne(id, {
      relations: ['flavors'],
    });
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return coffee;
  }

  create(createCoffeeDto: CreateCoffeeDto) {
    const coffee = this.coffeeRepository.create(createCoffeeDto);
    return this.coffeeRepository.save(coffee);
  }

  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    const coffee = await this.coffeeRepository.preload({
      id: +id,
      ...updateCoffeeDto,
    });
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return this.coffeeRepository.save(coffee);
  }

  async remove(id: string) {
    const coffee = await this.findOne(id);
    return this.coffeeRepository.remove(coffee);
  }
}
```

## Using Cascading Inserts and Updates
```ts
/* Coffee Entity - Enabling Cascading inserts */
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Flavor } from './flavor.entity';

@Entity() // sql table === 'coffee'
export class Coffee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  brand: string;

  @JoinTable()
  @ManyToMany(
    type => Flavor,
    flavor => flavor.coffees,
    {
      cascade: true, // 👈 or optionally just insert or update ['insert']
    },
  )
  flavors: Flavor[];
}

/* CoffeesService - FINAL CODE */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>,
  ) {}

  findAll() {
    return this.coffeeRepository.find({
      relations: ['flavors'],
    });
  }

  async findOne(id: string) {
    const coffee = await this.coffeeRepository.findOne(id, {
      relations: ['flavors'],
    });
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return coffee;
  }

  async create(createCoffeeDto: CreateCoffeeDto) {
    const flavors = await Promise.all(
      createCoffeeDto.flavors.map(name => this.preloadFlavorByName(name)),
    );

    const coffee = this.coffeeRepository.create({
      ...createCoffeeDto,
      flavors,
    });
    return this.coffeeRepository.save(coffee);
  }

  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    const flavors =
      updateCoffeeDto.flavors &&
      (await Promise.all(
        updateCoffeeDto.flavors.map(name => this.preloadFlavorByName(name)),
      ));

    const coffee = await this.coffeeRepository.preload({
      id: +id,
      ...updateCoffeeDto,
      flavors,
    });
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return this.coffeeRepository.save(coffee);
  }

  async remove(id: string) {
    const coffee = await this.findOne(id);
    return this.coffeeRepository.remove(coffee);
  }

  private async preloadFlavorByName(name: string): Promise<Flavor> {
    const existingFlavor = await this.flavorRepository.findOne({ name });
    if (existingFlavor) {
      return existingFlavor;
    }
    return this.flavorRepository.create({ name });
  }
}
```

## Adding Pagination
```ts
// Using the Nest CLI let’s create this DTO by entering (in your terminal)
nest g class common/dto/pagination-query.dto --no-spec

/* PaginationQueryDto */
export class PaginationQueryDto {
  @Type(() => Number)
  @IsOptional()
  @IsPositive()
  limit: number;

  @Type(() => Number)
  @IsOptional()
  @IsPositive()
  offset: number;
}

/* main.ts - useGlobalPipes addition */
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true,
    transformOptions: {
      enableImplicitConversion: true,
    },
  }),
);

/** 
 * CoffeesService
 * skip/take additions to findAll() 
 */
findAll(paginationQuery: PaginationQueryDto) {
  const { limit, offset } = paginationQuery;
  return this.coffeeRepository.find({
    relations: ['flavors'],
    skip: offset, // 👈
    take: limit, // 👈
  });
}
```

## Use Transactions

```bash
# Using the Nest CLI let’s create this Event Entity by entering
nest g class events/entities/event.entity --no-spec
```

```ts
/* Event */
@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string; 

  @Column()
  name: string; 

  @Column('json')
  payload: Record<string, any>;
}

/** 
 *  CoffeesService - constructor dependency injection 
 * 
 */
 
// ... other imports
import { Entity } from '../events/entities/event.entity';


@Injectable()
export class CoffeesService {
  constructor(private readonly connection: Connection) {}
}

/* CoffeesService - recommendCoffee() addition */
async recommendCoffee(coffee: Coffee) {
  const queryRunner = this.connection.createQueryRunner();
  
  await queryRunner.connect();
  await queryRunner.startTransaction(); 
  try {
    coffee.recommendations++;
    
    const recommendEvent = new Event();
    recommendEvent.name = 'recommend_coffee';
    recommendEvent.type = 'coffee';
    recommendEvent.payload = { coffeeId: coffee.id };
  
    await queryRunner.manager.save(coffee); 
    await queryRunner.manager.save(recommendEvent);
    
    await queryRunner.commitTransaction();
  } catch (err) {
    await queryRunner.rollbackTransaction();
  } finally {
    await queryRunner.release();
  }
}
```

## Adding Indexes to Entities
```ts
/** 
 * To help speed up this search, we can define an index on the “name” column 
 * using the @Index decorator. 
 */
@Index() // <--
@Column()
 name: string;
 
// Composite index that contains Multiple columns
@Index(['name', 'type']) // <-- 
export class Event {}
```

## Setting up Migrations

### `./ormconfig.js`
```js
module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'pass123',
  database: 'postgres',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};
```

```bash
# Creating a TypeOrm Migration
npx typeorm migration:create -n CoffeeRefactor
# CoffeeRefactor being the NAME we are giving "this" migration
```

### RUNNING MIGRATIONS
/**
 * 💡 Remember 💡
 * You must BUILD your Nest project (so that everything is output to the `/dist/` folder,
 * before a Migration can run, it needs compilated files.
 */

```bash
# Compile project first 
npm run build

# Run migration(s) 
npx typeorm migration:run

# REVERT migration(s)
npx typeorm migration:revert

# Let TypeOrm generate migrations (for you)
npx typeorm migration:generate -n SchemaSync
```

# Dependency Injection

## Diving Into Custom Providers

Example advanced use-cases where we might need Custom Providers:

1. Creating a custom instance of our provider instead of having Nest instantiate the class for us

2. Or let’s say we want to reuse an existing class in a second dependency

3. How about if we want to override a class with a mock version for testing

4. And lastly, what if we want to use a Strategy Pattern in which we can provide an abstract class and interchange the real implementation (or actual class that is to be used) based on different conditions

## Value based Providers
```ts
// Our mock implementation
export class MockCoffeesService { }

@Module({
  providers: [
    {
      provide: CoffeesService,
      useValue: new MockCoffeesService(), // <-- mock implementation
    }
  ]
})
export class CoffeesModule {}
```

## Non-class-based Provider Tokens
```ts
// String-valued token
{
  provide: 'COFFEE_BRANDS', // 👈
  useValue: ['buddy brew', 'nescafe'] // array of coffee brands,
},

// Injecting string-valued token into CoffeesService
@Injectable()
export class CoffeesService {
  constructor(@Inject('COFFEE_BRANDS') coffeeBrands: string[]) {}
}

/* coffees.constants.ts File */
export const COFFEE_BRANDS = 'COFFEE_BRANDS';
```

## Class Providers
```ts
// "useClass" syntax example
{
  provide: ConfigService,
  useClass:
    process.env.NODE_ENV === 'development'
      ? DevelopmentConfigService
      : ProductionConfigService,
},
```

## Factory Providers
```ts
// "useFactory" syntax example
{
  provide: 'COFFEE_BRANDS',
  useFactory: () => ['buddy brew', 'nescafe']
}
```

## Leverage Async Providers
```ts
// Asynchronous "useFactory" (async provider example)
{
  provide: 'COFFEE_BRANDS',
  // Note "async" here, and Promise/Async event inside the Factory function 
  // Could be a database connection / API call / etc
  // In our case we're just "mocking" this type of event with a Promise
  useFactory: async (connection: Connection): Promise<string[]> => {
    // const coffeeBrands = await connection.query('SELECT * ...');
    const coffeeBrands = await Promise.resolve(['buddy brew', 'nescafe'])
    return coffeeBrands;
  },
  inject: [Connection],
},
```

## Create a Dynamic Module(DatabaseModule)

```bash
# Generate a DatabaseModule
nest g mo database
```

```ts
// Initial attempt at creating "CONNECTION" provider, and utilizing useValue for values */
{
  provide: 'CONNECTION',
  useValue: createConnection({
    type: 'postgres',
    host: 'localhost',
    port: 5432
  }),
}

// Creating static register() method on DatabaseModule
export class DatabaseModule {
  static register(options: ConnectionOptions): DynamicModule {  }
}

// Improved Dynamic Module way of creating CONNECTION provider
export class DatabaseModule {
  static register(options: ConnectionOptions): DynamicModule {
    return {
      module: DatabaseModule,
      providers: [
        {
          provide: 'CONNECTION', // 👈
          useValue: createConnection(options), 
        }
      ]
    }
  }
}

// Utilizing the dynamic DatabaseModule in another Modules imports: []
imports: [
  DatabaseModule.register({ // 👈 passing in dynamic values
    type: 'postgres',
    host: 'localhost',
    password: 'password',
  })
]
```

## Control Providers Scope
```ts
// Scope DEFAULT - This is assumed when NO Scope is entered like so: @Injectable() */
@Injectable({ scope: Scope.DEFAULT })
export class CoffeesService {}

// -------------

/** 
 * Scope TRANSIENT 
  
 * Transient providers are NOT shared across consumers. 
 * Each consumer that injects a transient provider 
 * will receive a new, dedicated instance of that provider. 
 */
@Injectable({ scope: Scope.TRANSIENT })
export class CoffeesService {}

// Scope TRANSIENT with a Custom Provider
{
  provide: 'COFFEE_BRANDS',
  useFactory: () => ['buddy brew', 'nescafe'],
  scope: Scope.TRANSIENT // 👈
}

// -------------

/**
 * Scope REQUEST 

 * Request scope provides a new instance of the provider 
 * exclusively for each incoming request. 
 */
@Injectable({ scope: Scope.REQUEST })
export class CoffeesService {}

```

## Diving Deeper Into Request-Scoped Providers
```ts
// Injecting the ORIGINAL Request object
@Injectable({ scope: Scope.REQUEST })
export class CoffeesService {
  constructor(@Inject(REQUEST) private request: Request) {} // 👈
}
```

# Application Configuration

## Introducing the Config Module

It’s a common best practice in the Node.js community to store these configuration variables as a part of the environment - in the Node.js global process.env object.

NestJS Config module helps make working with these environment variables, even simpler.

```bash
# Install @nestjs/config
npm i @nestjs/config
```

```ts
// .env file in root directory
DATABASE_USER=postgres
DATABASE_PASSWORD=pass123
DATABASE_NAME=postgres
DATABASE_PORT=5432
DATABASE_HOST=localhost

// Make sure .env file is in .gitignore file and NOT tracked by git */
# Env
*.env

/* AppModule updated to use process.env variables */
TypeOrmModule.forRoot({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  autoLoadEntities: true,
  synchronize: true,
}),
```

## Custom Environment File Paths
```ts
/**
 * To specify another path for this file, 
 * let’s pass in an options object into the forRoot() method 
 * and set the envFilePath property like so:
   
 * In this example, we’re looking instead for a .environment file.
 */
ConfigModule.forRoot({
  envFilePath: '.environment’,
});

/** 
 * Have ConfigModule *ignore* .env files 
 * Useful when using Provider UI's such as Heroku, etc (and they handle all ENV variables)
 */
ConfigModule.forRoot({
  ignoreEnvFile: true,
});
```

## Schema Validation

```bash
# Install neccessary dependencies
$ npm install @hapi/joi
$ npm install --save-dev @types/hapi__joi
```

```ts
// Use Joi validation
ConfigModule.forRoot({
  validationSchema: Joi.object({
    DATABASE_HOST: Joi.required(),
    DATABASE_PORT: Joi.number().default(5432),
  }),
}),
```

## Using the Config Service
```ts
/* Utilize ConfigService */
import { ConfigService } from '@nestjs/config';

constructor(
  private readonly configService: ConfigService, // 👈
) {}

/* Accessing process.env variables from ConfigService */
const databaseHost = this.configService.get<string>('DATABASE_HOST');
console.log(databaseHost);
```

## Custom Configuration Files
```ts
/* /src/config/app.config.ts File */
export default () => ({
  environment: process.env.NODE_ENV || 'development',
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432
  }
});

/* Setting up "appConfig" within our Application */
import appConfig from './config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig], // 👈
    }),
  ],
})
export class AppModule {}

// ---------

/**
 * Grabbing this nested property within our App 
 * via "dot notation" (a.b)
 */
const databaseHost = this.configService.get('database.host', 'localhost');
```

## Configuration Namespaces and Partial Registration
```ts
/* /src/coffees/coffees.config.ts File */
export default registerAs('coffees', () => ({ // 👈
  foo: 'bar', // 👈
}));

/* Partial Registration of coffees namespaced configuration */
@Module({
  imports: [ConfigModule.forFeature(coffeesConfig)], // 👈
})
export class CoffeesModule {}

// ---------
// ⚠️ sub optimal ways of retrieving Config ⚠️

/* Grab coffees config within App */
const coffeesConfig = this.configService.get('coffees');
console.log(coffeesConfig);

/* Grab nested property within coffees config */
const foo = this.configService.get('coffees.foo');
console.log(foo);

// ---------
// 💡 Optimal / Best-practice 💡

constructor(
  @Inject(coffeesConfig.KEY)
  private coffeesConfiguration: ConfigType<typeof coffeesConfig>, 
) {
  // Now strongly typed, and able to access properties via:
  console.log(coffeesConfiguration.foo); 
}
```

## Asynchronously Configure Dynamic Modules
```ts
/* forRootAsync() */
TypeOrmModule.forRootAsync({ // 👈
  useFactory: () => ({
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    autoLoadEntities: true,
    synchronize: true,
  }),
}),
```

# Other Building Blocks by Example

In NestJS, we have 4 additional building blocks (for features), that we haven’t showcased yet - these are:

1. Exception filters

2. Pipes

3. Guards

4. Interceptors

## Understanding Binding Techniques

Nest building blocks can be:
- Globally-scoped, 

- Controller-scoped, 

- Method-scoped, 

- and (the bonus 4th one) Param-scoped which as we said, is available to Pipes only.

## Catch Exceptions with Filters

```bash
# Generate Filter with Nest CLI 
nest g filter common/filters/http-exception
```

```ts
// Catch decorator
@Catch(HttpException)

/* HttpExceptionFilter final code */
import { Catch, HttpException, ExceptionFilter, ArgumentsHost } from "@nestjs/common";
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter<T extends HttpException> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();
    const error =
      typeof response === 'string'
        ? { message: exceptionResponse }
        : (exceptionResponse as object);
    
    response.status(status).json({
      ...error,
      timestamp: new Date().toISOString(),
    });
  }
}
```

## Protect Routes with Guards

```bash
# Generate ApiKeyGuard with Nest CLI
nest g guard common/guards/api-key
```

```ts
// Apply ApiKeyGuard globally
app.useGlobalGuards(new ApiKeyGuard());

/* ApiKeyGuard code */
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.header('Authorization');
    return authHeader === process.env.API_KEY;
  }
}
```

## Using Metadata to Build Generic Guards or Interceptors
```ts
/* public.decorator.ts FINAL CODE */
import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';

export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

/* ApiKeyGuard FINAL CODE */
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly configService: ConfigService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());
    if (isPublic) {
      return true;
    }
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.header('Authorization');
    return authHeader === this.configService.get('API_KEY');
  }
}
```

## Add Pointcuts with Interceptors

Interceptors make it possible for us to:

- bind extra logic before or after method execution

- transform the result returned from a method

- transform the exception thrown from a method

- extend basic method behavior

- or even completely overriding a method - depending on a specific condition (for example: doing something like caching various responses)

```ts
// Generate WrapResponseInterceptor with Nest CLI 
nest g interceptor common/interceptors/wrap-response

/* WrapResponseInterceptor FINAL CODE */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class WrapResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');

    return next.handle().pipe(map(data => ({ data })));
  }
}

// Apply Interceptor globally in main.ts file
app.useGlobalInterceptors(new WrapResponseInterceptor());
```

## Handling Timeouts with Interceptors

Another technique useful for Interceptors is to extend the basic function behavior by applying RxJS operators to the response stream.

To help us learn about this concept by example - let’s imagine that we need to handle timeouts for all of our route requests.

When an endpoint does not return anything after a certain period of time, we need to terminate the request, and send back an error message.

```bash
# Generate TimeoutInterceptor with Nest CLI
nest g interceptor common/interceptors/timeout
```

```ts
/* Apply TimeoutInterceptor globally in main.ts file */

app.useGlobalInterceptors(
  new WrapResponseInterceptor(), 
  new TimeoutInterceptor(), // 👈
);

/* Add manual timeout to force timeout interceptor to work */
await new Promise(resolve => setTimeout(resolve, 5000));

/* TimeoutInterceptor FINAL CODE */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  RequestTimeoutException,
} from '@nestjs/common';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      timeout(3000),
      catchError(err => {
        if (err instanceof TimeoutError) {
          return throwError(new RequestTimeoutException());
        }
        return throwError(err);
      }),
    );
  }
}
```

## Creating Custom Pipes

Pipes have two typical use cases:

1. **Transformation**: where we transform input data to the desired output

2. **Validation**: where we evaluate input data and if valid, simply pass it through unchanged. If the data is NOT valid - we want to throw an exception.

In both cases, pipes operate on the arguments being processed by a controller’s route handler. 

NestJS triggers a pipe just before a method is invoked.

Pipes also receive the arguments meant to be passed on to the method. Any transformation or validation operation takes place at this time - afterwards the route handler is invoked with any (potentially) transformed arguments.

```bash
# Generate ParseIntPipe with Nest CLI
nest g pipe common/pipes/parse-int
```

```ts
/* ParseIntPipe FINAL CODE */
import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException(
        `Validation failed. "${val}" is not an integer.`,
      );
    }
    return val;
  }
}
```

## Bonus: Add Request Logging with Middleware

Middleware functions have access to the request and response objects, and are not specifically tied to any method, but rather to a specified route PATH.

Middleware functions can perform the following tasks:

- executing code

- making changes to the request and the response objects.

- ending the request-response cycle.

- Or even calling the next middleware function in the call stack.

When working with middleware, if the current middleware function does not END the request-response cycle, it must call the next() method, which passes control to the next middleware function.

Otherwise, the request will be left hanging - and never complete.

```bash
# Generate LoggingMiddleware with Nest CLI
nest g middleware common/middleware/logging
```

```ts
// Apply LoggingMiddleware in our AppModule 
consumer
  .apply(LoggingMiddleware)
  .forRoutes(‘*’);

/* LoggingMiddleware FINAL CODE */
import {
  Injectable,
  NestMiddleware,
} from '@nestjs/common';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.time('Request-response time');
    console.log('Hi from middleware!');
    
    res.on('finish', () => console.timeEnd('Request-response time'));
    next(); 
  }
}
```

## Bonus: Create Custom Param Decorators
```ts
// Using the Protocol decorator
@Protocol(/* optional defaultValue */)

/* @Protocal() decorator FINAL CODE */
import {
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';

export const Protocol = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.protocol;
  },
);
```

# Generating OpenAPI Specification

## Introducing the Swagger Module

One of the best ways to document our application is to use the OpenAPI specification. The OpenAPI specification is a language-agnostic definition format used to describe RESTful APIs.

An OpenAPI document allows us to describe our entire API, including:

- Available operations (endpoints)

- Operation parameters: Input and output for each operation

- Authentication methods

- Contact information, license, terms of use and other information.

- ... and much more ...

```bash
/**
 * Installing @nestjs/swagger
 * & Swagger UI for Express.js (which our application uses)
 * 💡 Note: If your application is using Fastiy, install `fastify-swagger` instead
 */
npm install --save @nestjs/swagger swagger-ui-express
```

```ts
// Setting up Swagger document 
const options = new DocumentBuilder()
  .setTitle('Iluvcoffee')
  .setDescription('Coffee application')
  .setVersion('1.0')
  .build();

const document = SwaggerModule.createDocument(app, options);

SwaggerModule.setup('api', app, document);

/** 
 * With the App running (npm run start:dev if not)
 * To view the Swagger UI go to:
 * http://localhost:3000/api
 */
```

## Enabling CLI Plugin
```ts
/**
 * Add the @nestjs/swagger plugin to our application
 * nest-cli.json
 */
"compilerOptions": {
  "deleteOutDir": true,
  "plugins": ["@nestjs/swagger/plugin"] // 👈
}
```

## Decorating Model Properties
```ts
// Fixing PartialType for Swagger
import { PartialType } from '@nestjs/swagger';

/**
 * @ApiProperty decorator useful to *override* 
 * information automatically inferred from the @nestjs/swagger plugin
 */
@ApiProperty({ description: 'The name of a coffee.' })
```

## Adding Example Responses
```ts
/**
 * Setting different API Responses for Swagger UI
 * (long version)
*/
@ApiResponse({ status: 403, description: 'Forbidden.' })

/* short-hand versions are available as well */
@ApiForbiddenResponse({ description: 'Forbidden.' })
```

## Using Tags to Group Resources
```ts
/**
 * Swagger Tags decorator.
 * 💡 Note: Can also be done on an individual method-level if needed as well!
 */
@ApiTags('coffees')
class CoffeesController {}
```

# Testing

## Introduction to Jest

With NestJS, we can use any testing framework we prefer. However, it can be quite tedious to set everything up.

Luckily for us - Nest provides a built-in integration with the Jest testing framework, out-of-the-box - so we don’t have to do anything to get started!

```bash
# For unit tests
npm run test 

# For unit tests + collecting testing coverage
npm run test:cov

# For e2e tests
npm run test:e2e
```

## Getting Started with Test Suites

**Unit Tests**
For unit tests In NestJS, it’s a common practice to keep the spec files in the same folder as the application source code files that they test. 

Each controller, provider, service, etc. should have its own dedicated test file. The test file extension must be (dot).spec.ts (this is so that integrated test tooling can identify it as a test file with test suites).

**End-to-End (e2e) Tests**
For e2e tests, these files are typically located in a dedicated `test` directory by default. e2e tests are typically grouped into separate files by the feature or functionality that they test. The file extension must be (dot).e2e-spec.ts. 

**How are they different?**
While unit tests focus on individual classes and functions…

e2e tests are great for high-level validation of the entire system. e2e testing covers the interaction of classes and modules at a more aggregate level -- closer to the kind of interaction that end-users will have with the production system. 

```bash
# Run a unit test for a -specific- file pattern
npm run test:watch -- coffees.service
```

```ts
// Basic / empty "Mocks" for Entities in our CoffeesService 
providers: [
  CoffeesService,
  { provide: Connection, useValue: {} },
  { provide: getRepositoryToken(Flavor), useValue: {} }, // 👈
  { provide: getRepositoryToken(Coffee), useValue: {} }, // 👈
]
```

## Adding Unit Tests

One problem we’ll notice is that the “findOne” method uses “coffeeRepository.findOne” inside of it, so we’ll have to make sure to mock this repository method for our test to run properly. 

```ts
/* 
  coffees-service.spec.ts - FINAL CODE
*/
import { Test, TestingModule } from '@nestjs/testing';
import { CoffeesService } from './coffees.service';
import { Connection, Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Flavor } from './entities/flavor.entity';
import { Coffee } from './entities/coffee.entity';
import { NotFoundException } from '@nestjs/common';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
  create: jest.fn(),
});

describe('CoffeesService', () => {
  let service: CoffeesService;
  let coffeeRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoffeesService,
        { provide: Connection, useValue: {} },
        {
          provide: getRepositoryToken(Flavor),
          useValue: createMockRepository(),
        },
        {
          provide: getRepositoryToken(Coffee),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    service = module.get<CoffeesService>(CoffeesService);
    coffeeRepository = module.get<MockRepository>(getRepositoryToken(Coffee));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    describe('when coffee with ID exists', () => {
      it('should return the coffee object', async () => {
        const coffeeId = '1';
        const expectedCoffee = {};

        coffeeRepository.findOne.mockReturnValue(expectedCoffee);
        const coffee = await service.findOne(coffeeId);
        expect(coffee).toEqual(expectedCoffee);
      });
    });
    describe('otherwise', () => {
      it('should throw the "NotFoundException"', async (done) => {
        const coffeeId = '1';
        coffeeRepository.findOne.mockReturnValue(undefined);

        try {
          await service.findOne(coffeeId);
          done();
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          expect(err.message).toEqual(`Coffee #${coffeeId} not found`);
        }
      });
    });
  });
});
```

## Diving Into e2e Tests

```bash
# Run e2e tests
npm run test:e2e
```

```ts
/* 
  app.e2e-spec.ts - FINAL CODE 
*/
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer()) // 👈 
      .get('/')
      .set('Authorization', process.env.API_KEY) // 👈 
      .expect(200)
      .expect('Hello World!');
  });

  afterAll(async () => {
    await app.close();
  });
});
```

## Creating our First e2e Test

Grouping our applications functionality into Modules is strongly recommended as an effective way to organize our components. For most applications, the resulting architecture will employ multiple modules, each encapsulating a closely related set of capabilities.

Because of this encapsulated organization, this allows us to test each feature independently by importing a specific module (that we want to test) into our TestingModule.

In this lesson, we’ll be testing the “Coffees” feature we worked on throughout this course, and test some of the CRUD endpoints we provided in it so far.

💡 IMPORTANT NOTE

Sometimes when errors happen within npm scripts (such as the tests we're running inside test:e2e), post hooks won't run! 

  

You have a few options here, when these error happen, you can:

 1) Manually run the `posttest:e2e` hook when Jest errors happen (to make sure your database gets removed)

 2) Use a library like `npm-run-all` (npm i --D npm-run-all) and use the --continue-on-error flag to make sure everything still runs, moving the "post" hook into an npm script to be ran, like so:

"pretest:e2e": "docker-compose up -d test-db",

"run:jest": "jest --config ./test/jest-e2e.json",

"test:e2e": "npm-run-all the-actual-test run-after-test-even-if-failed --continue-on-error",

"test:e2e:teardown": "docker-compose stop test-db && docker-compose rm -f test-db"

```bash
# Run e2e tests for a -specific- file pattern
npm run test:e2e -- coffees
```

```ts
/* 💡💡 IMPORTANT NOTE 💡💡
  Sometimes when errors happen within npm scripts (such as the tests we're 
  running inside test:e2e), post hooks won't run! 
  
  You have a few options here, when these error happen, you can:
  
  1) Manually run the `posttest:e2e` hook.
  
  2) Use a library like `npm-run-all` (npm i --D npm-run-all) and use 
     the --continue-on-error flag to make sure everything still runs, moving the "post" hook
     into an npm script to be ran
     
  For example:
  
  "pretest:e2e": "docker-compose up -d test-db",
  "run:jest": "jest --config ./test/jest-e2e.json",
  "test:e2e": "npm-run-all the-actual-test run-after-test-even-if-failed --continue-on-error",
  "test:e2e:teardown": "docker-compose stop test-db && docker-compose rm -f test-db"
*/


/*
  docker-compose.yml - FINAL CODE 
*/
version: "3"

services:
  db:
    image: postgres
    restart: always
    ports:
      - "5432:5432"
    environment:
      POSTGRES_PASSWORD: pass123
  test-db:
    image: postgres
    restart: always
    ports:
      - "5433:5432" # 👈 Note the 5433 port (since we are using 5432 for our regular db)
    environment:
      POSTGRES_PASSWORD: pass123

/*
 package.json pre & post hook additions
*/

"pretest:e2e": "docker-compose up -d test-db",
"posttest:e2e": "docker-compose stop test-db && docker-compose rm -f test-db"

/* 
  test/coffees/coffees.e2e-spec.ts - FINAL CODE 
*/
import { INestApplication } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import { CoffeesModule } from '../../src/coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('[Feature] Coffees - /coffees', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        CoffeesModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5433,
          username: 'postgres',
          password: 'pass123',
          database: 'postgres',
          autoLoadEntities: true,
          synchronize: true,
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it.todo('Create [POST /]');
  it.todo('Get all [GET /]');
  it.todo('Get one [GET /:id]');
  it.todo('Update one [PATCH /:id]');
  it.todo('Delete one [DELETE /:id]');

  afterAll(async () => {
    await app.close();
  });
});
```

## Implementing e2e Test Logic
```ts
/* 
  test/coffees/coffees.e2e-spec.ts - FINAL CODE 
*/
import { INestApplication, ValidationPipe, HttpStatus, HttpServer } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import { CoffeesModule } from '../../src/coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { CreateCoffeeDto } from 'src/coffees/dto/create-coffee.dto';
import { UpdateCoffeeDto } from 'src/coffees/dto/update-coffee.dto';

describe('[Feature] Coffees - /coffees', () => {
  const coffee = {
    name: 'Shipwreck Roast',
    brand: 'Buddy Brew',
    flavors: ['chocolate', 'vanilla'],
  };
  const expectedPartialCoffee = jasmine.objectContaining({
    ...coffee,
    flavors: jasmine.arrayContaining(
      coffee.flavors.map(name => jasmine.objectContaining({ name })),
    ),
  });
  let app: INestApplication;
  let httpServer: HttpServer;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        CoffeesModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5433,
          username: 'postgres',
          password: 'pass123',
          database: 'postgres',
          autoLoadEntities: true,
          synchronize: true,
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );

    await app.init();
    httpServer = app.getHttpServer();
  });

  it('Create [POST /]', () => {
    return request(httpServer)
      .post('/coffees')
      .send(coffee as CreateCoffeeDto)
      .expect(HttpStatus.CREATED)
      .then(({ body }) => {
        expect(body).toEqual(expectedPartialCoffee);
      });
  });

  it('Get all [GET /]', () => {
    return request(httpServer)
      .get('/coffees')
      .then(({ body }) => {
        console.log(body)
        expect(body.length).toBeGreaterThan(0);
        expect(body[0]).toEqual(expectedPartialCoffee);
      });
  });

  it('Get one [GET /:id]', () => {
    return request(httpServer)
      .get('/coffees/1')
      .then(({ body }) => {
        expect(body).toEqual(expectedPartialCoffee);
      });
  });

  it('Update one [PATCH /:id]', () => {
    const updateCoffeeDto: UpdateCoffeeDto = {
      ...coffee,
      name: 'New and Improved Shipwreck Roast'
    }
    return request(httpServer)
      .patch('/coffees/1')
      .send(updateCoffeeDto)
      .then(({ body }) => {
        expect(body.name).toEqual(updateCoffeeDto.name);

        return request(httpServer)
          .get('/coffees/1')
          .then(({ body }) => {
            expect(body.name).toEqual(updateCoffeeDto.name);
          });
      });
  });

  it('Delete one [DELETE /:id]', () => {
    return request(httpServer)
      .delete('/coffees/1')
      .expect(HttpStatus.OK)
      .then(() => {
        return request(httpServer)
          .get('/coffees/1')
          .expect(HttpStatus.NOT_FOUND);
      })
  });

  afterAll(async () => {
    await app.close();
  });
});
```

# Bonus: Add MongoDB with Mongoose

## Running MongoDB (with Docker)
```yml
// yaml
version: "3"

services:
  db:
    image: mongo # container image to be used
    restart: always 
    ports: # expose ports in “host:container” format
      - 27017:27017
    environment: #env variables to pass into the container
       MONGODB_DATABASE: nest-course
```

```bash
# Starting containers (in detached/background mode)
docker-compose up -d

# Taking containers down
docker-compose down
```

## Introducing the Mongoose Module

WARNING: Since `mongoose@5.11.1` release, `@types/mongoose` package is no longer needed as Mongoose published its own type definitions.
Nest itself is database agnostic - allowing you to easily integrate with any SQL or NoSQL database of your choice. 

There are a lot of different ways you can integrate Nest with databases, and they all depend on your personal preferences or projects needs. 

NOTE: If you’re having any issues setting up MongooseModule here - make sure that Docker is running with `docker compose up -d`. Also make sure the db name inside your MongooseModule.forRoot matches what you have in your docker-compose file.

```bash
# Install mongoose dependencies
npm i mongoose @nestjs/mongoose
```

```ts
/* Setup MongooseModule in AppModule */
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nest-course'),
  ],
})
export class AppModule {}
```

## Creating a Mongoose Model

One of the most vital concepts in MongoDB is the idea of “Data Models”.

These Models are responsible for creating, reading and deleting “documents” from the Mongo database. 

If you’re coming from a SQL background, one thing to remember about Mongo databases, is that these documents are being stored in “collections” not “tables”.


```ts
/* Coffee Schema - FINAL CODE */
import { Schema, Prop } from '@nestjs/mongoose’';
import { Document } from 'mongoose';

@Schema()
export class Coffee extends Document {
  @Prop() 
  name: string;

  @Prop()
  brand: string;

  @Prop([String])
  flavors: string[];
}

export const CoffeeSchema = SchemaFactory.createForClass(Coffee);

/* Add Schema to MongooseModule in CoffeesModule */
MongooseModule.forFeature([{ 
  name: Coffee.name, 
  schema: CoffeeSchema 
}])
```

## Using a Mongoose Model to Access MongoDB

Our Mongoose Models let us interact with MongoDB - with each Model representing a separate collection. 

In Mongo, an instance of a model is called a Document - if you’re familiar with SQL databases - it might help to think of Documents as something similar to “Rows”.

There is a class from Mongoose called Model that acts as an abstraction over our datasource - exposing a variety of useful methods for interacting with the documents stored in our database.

```ts
/* Utilizing Mongo Coffee Model */
constructor(
  @InjectModel(Coffee.name)
  private coffeeModel: Model<Coffee>,
) {}


/* CoffeesService - FINAL CODE */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectModel(Coffee.name) private readonly coffeeModel: Model<Coffee>,
  ) {}

  findAll() {
    return this.coffeeModel.find().exec();
  }

  async findOne(id: string) {
    const coffee = await this.coffeeModel.findOne({ _id: id }).exec();
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return coffee;
  }

  create(createCoffeeDto: CreateCoffeeDto) {
    const coffee = new this.coffeeModel(createCoffeeDto);
    return coffee.save();
  }

  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    const existingCoffee = await this.coffeeModel
      .findOneAndUpdate({ _id: id }, { $set: updateCoffeeDto }, { new: true })
      .exec();

    if (!existingCoffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return existingCoffee;
  }

  async remove(id: string) {
    const coffee = await this.findOne(id);
    return coffee.remove();
  }
}
```

## Adding Pagination

```bash
# Generate PaginationQueryDto (without test file)
nest g class common/dto/pagination-query.dto --no-spec
```

```ts
/* PaginationQueryDto - FINAL CODE */
export class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @IsPositive()
  offset: number;
}

/* CoffeesService - FINAL CODE */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectModel(Coffee.name) private readonly coffeeModel: Model<Coffee>,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return this.coffeeModel
      .find()
      .skip(offset)
      .limit(limit)
      .exec();
  }

  async findOne(id: string) {
    const coffee = await this.coffeeModel.findOne({ _id: id }).exec();
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return coffee;
  }

  create(createCoffeeDto: CreateCoffeeDto) {
    const coffee = new this.coffeeModel(createCoffeeDto);
    return coffee.save();
  }

  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    const existingCoffee = await this.coffeeModel
      .findOneAndUpdate({ _id: id }, { $set: updateCoffeeDto }, { new: true })
      .exec();

    if (!existingCoffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return existingCoffee;
  }

  async remove(id: string) {
    const coffee = await this.findOne(id);
    return coffee.remove();
  }
}
```

## Use Transactions

Let’s say that a new business requirement comes in for our application - and the product team wants users to have the ability to “recommend” different Coffees, AND whenever that occurs - we need to add a new Event to the database that can be used later for data analytics purposes.

So we’re going to need 2 things here:

We have to provide a new endpoint that allows users to recommend coffees, and we’re going to need to store the Event after the previous call finishes.

In order for this whole process to “succeed” - we need BOTH operations to be successful. Otherwise we may have inconsistencies in our database.

This is where “transactions” come in.

A database “transaction” symbolizes a unit of work performed within a database management system.

Transactions are a reliable way to accomplish multiple tasks independent of other transactions.

```bash
# Generate Event Entity (without test file)
nest g class events/entities/event.entity --no-spec
```

```ts
/* Event entity - FINAL CODE */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class Event extends mongoose.Document {  // Note "entity" was removed from the class "name"
  @Prop()
  type: string;

  @Prop()
  name: string;

  @Prop(mongoose.SchemaTypes.Mixed)
  payload: Record<string, any>;
}

export const EventSchema = SchemaFactory.createForClass(Event);

/* CoffeesService - FINAL CODE */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { Event } from '../events/entities/event.entity';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectModel(Coffee.name) private readonly coffeeModel: Model<Coffee>,
    @InjectConnection() private readonly connection: Connection,
    @InjectModel(Event.name) private readonly eventModel: Model<Event>,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return this.coffeeModel
      .find()
      .skip(offset)
      .limit(limit)
      .exec();
  }

  async findOne(id: string) {
    const coffee = await this.coffeeModel.findOne({ _id: id }).exec();
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return coffee;
  }

  create(createCoffeeDto: CreateCoffeeDto) {
    const coffee = new this.coffeeModel(createCoffeeDto);
    return coffee.save();
  }

  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    const existingCoffee = await this.coffeeModel
      .findOneAndUpdate({ _id: id }, { $set: updateCoffeeDto }, { new: true })
      .exec();

    if (!existingCoffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return existingCoffee;
  }

  async remove(id: string) {
    const coffee = await this.findOne(id);
    return coffee.remove();
  }

  async recommendCoffee(coffee: Coffee) {
    const session = await this.connection.startSession();
    session.startTransaction();

    try {
      coffee.recommendations++;

      const recommendEvent = new this.eventModel({
        name: 'recommend_coffee',
        type: 'coffee',
        payload: { coffeeId: coffee.id },
      });
      await recommendEvent.save({ session });
      await coffee.save({ session });

      await session.commitTransaction();
    } catch (err) {
      await session.abortTransaction();
    } finally {
      session.endSession();
    }
  }
}
```

## Adding Indexes to Schemas

Indexes are special “lookup tables” that our database search engine can use to speed up data retrieval.

Without indexes, Mongo must perform a collection scan - meaning it must scan every document in a collection - to select those documents that match the query statement.

```ts
// Index on a single property 
@Prop({ index: true })

// Compound index referencing multiple properties 
eventSchema.index({ name: 1, type: -1 })

/**
 * In this example: 
 * We passed a value of 1 (to name) which specifies that the index 
 * should order these items in an Ascending order. 
 * 
 * We passed type a value of (negative) -1 which specifies that 
 * The index should order these items in Descending order.
 */
```
