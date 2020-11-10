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

// Install neccessary TypeORM dependencies

```bash
npm install @nestjs/typeorm typeorm pg
```

## Features

```bash
# Add new entity without tests
nest g class coffees/entities/flavor.entity --no-spec
```
