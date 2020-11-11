<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>


## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## APPLICATION

```bash
# Start containers in detached / background mode
docker-compose up -d

# Stop containers
docker-compose down
```

### TypeORM

```bash
# Install neccessary TypeORM dependencies
npm install @nestjs/typeorm typeorm pg
```

#### Migrations

Create `ormconfig.js` file in the root directory.

```bash
# Creating a TypeOrm Migration (`CoffeeRefactor` it's a migration name)
npx typeorm migration:create -n CoffeeRefactor
```

/* RUNNING MIGRATIONS */

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


## Features

```bash
# Add new entity without tests
nest g class coffees/entities/flavor.entity --no-spec

# Using the Nest CLI let’s create this DTO by entering (in your terminal)
nest g class common/dto/pagination-query.dto --no-spec

# Nest CLI - Generate a new CoffeeRatingModule
nest g mo coffee-rating

# Nest CLI - Generate a new CoffeeRatingService 
nest g s coffee-rating

# Generate a DatabaseModule
nest g mo database
```

### Pagination

```bash
# Generate class of Pagination query
nest g class common/dto/pagination-query.dto --no-spec
```

Use it:
`localhost:3000/coffees?limit=2`

