## Description

Auth SSO microservice

`NOTE: To access other microservices you need start docker-compose`

## Installation

```bash
$ yarn

$ cp ./.env.example ./.env
```

## Prisma

```bash
# install and deploy prisma
$ yarn global add prisma # or npm install -g prisma

# deploy
$ cd ./database && prisma deploy
```

## Start

```bash
$ yarn start # dev

$ yarn start:dev # dev watching

$ yarn start:prod # prod
```

## Test

```bash
$ yarn test # unit

$ yarn test:watch # unit watching

$ yarn test:coverage # coverage
```
