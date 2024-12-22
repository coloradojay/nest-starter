<p align="center">
  <a href="https://nestjs.com/" target="blank"><img src="https://github.com/nestjs/docs.nestjs.com/blob/master/src/assets/logo-small.svg" height="100" alt="Nest logo" /></a>
  <a href="https://typeorm.io/" target="blank"><img src="https://avatars.githubusercontent.com/u/20165699" height="100" alt="TypeORM logo" /></a>
  <a href="https://www.postgresql.org/" target="blank"><img src="https://www.postgresql.org/media/img/about/press/elephant.png" height="100" alt="PostgreSQL logo" /></a>
  <a href="https://jestjs.io/" target="blank"><img src="https://github.com/facebook/jest/blob/main/website/static/img/jest.png" height="100" alt="Jest logo" /></a>
  <a href="https://prettier.io/" target="blank"><img src="https://github.com/prettier/prettier/blob/main/website/static/icon.png" height="100" alt="Prettier logo" /></a>
  <a href="https://eslint.org/" target="blank"><img src="https://github.com/eslint/website/blob/master/assets/img/logo.svg" height="100" alt="ESLint logo" /></a>
</p>

<p align="center">
  <a href="https://docs.docker.com/" target="blank"><img src="https://www.docker.com/wp-content/uploads/2022/03/Moby-logo.png" height="60" alt="Docker logo" /></a>
  <a href="https://github.com/features/actions" target="blank"><img src="https://avatars.githubusercontent.com/u/44036562" height="60" alt="GitHub Actions logo" /></a>
  <a href="https://circleci.com/" target="blank"><img src="https://www.vectorlogo.zone/logos/circleci/circleci-icon.svg" height="60" alt="CircleCI logo" /></a>
</p>

# NestJS Starter with JWT Auth

## Table of contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [What's in the box ?](#whats-in-the-box)
  - [Adminer](#adminer)
  - [Api Documentation](#api-docs)
  - [Commitizen](#commitizen)
  - [Commitlint](#commitlint)
  - [Docker Compose](#docker-compose)
  - [ESLint](#eslint)
  - [Husky](#husky)
  - [Lint-staged](#lint-staged)
  - [Prettier](#prettier)
- [Running the app](#running-the-app)
- [Test](#test)

---

## Getting Started

These instructions will allow you to get the project up and running on your local machine.

### Prerequisites

What things you need to install the software and how to install them :

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/)
- [Docker](https://docs.docker.com/get-docker/)

---

## How To Use It

### Installation

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

## What's in the box?

### Adminer

### API Docs

[API docs](http://localhost:3000/api-docs)

### Commitizen

Commitizen is a command line utility that makes it easier to create commit messages following the conventional commit format specification.

Use `git cz` instead of git commit to use commitizen.

Add and commit with Commitizen

Configuration file: `.czrc`.

### Commitlint

Commitlint checks if your commit messages meet the conventional commit format.

Configuration file: `.commitlintrc.json`.

In general the pattern mostly looks like this:

```bash
type(scope?): subject #scope is optional
```

### Docker Compose

### Eslint

### Husky

### Lint Staged

### Prettier

---
