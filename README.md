# NestJS Starter with JWT Auth

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository with JWT Authentication. Features Swagger for documentation, JWT access tokens and decorators for allowing private or public routers. Postgres and Adminer are made available using Docker Compose.

## Installation

```bash
$ npm install
```

## Secrets

Create a copy of the env sample and configure with secrets to the database and JWT.

```bash
$ cp .env.sample .env
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
