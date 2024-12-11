# NestJS Starter with JWT Auth

## Technology Stack and Features

⚡ [Nest](https://github.com/nestjs/nest) for the Typescript backend API.
🧰 TypeORM for the Typescript SQL database interactions (ORM).
💾 PostgreSQL as the SQL database.
🥽 Adminer for inspecting the database.
🐋 Docker Compose for development and production.
🔒 Secure password hashing by default featuring Argon2.
🔑 JWT (JSON Web Token) authentication.
📫 Email based password recovery.
✅ Tests with Jest.

### Interactive API Documentation

[API docs](http://localhost:3000/api-docs)

## How To Use It

### Install all required dependencies

```bash
$ npm install
```

## Configure Secrets

Create a copy of the env sample and configure with secrets to the database and JWT.

```bash
$ cp .env.sample .env
```

## Docker Compose

Start the local development environment with Docker Compose

```bash
$ docker compose up --build -d
```

## Database Migrations

Typeorm is currently configured to auto sync database tables and columns with created enities at server start.

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
