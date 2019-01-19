# Microservices with NestJS

## Install

```bash
$ git clone https://github.com/elsangedy/microservices.git
$ cd ./microservices
$ docker-compose up -d
$ yarn bs
```

## First run

```bash
# create .env file of graphql service
$ cd ./packages/graphql && cp ./.env.example ./.env && cd ../../

# create .env file and deploy prisma of auth service
$ cd ./packages/auth && cp ./.env.example ./.env && cd ./prisma && prisma deploy && cd ../../
```

## Start

Can you start all or access each project and start independent

```bash
# start all

# develop
$ yarn start

# develop whatching
$ yarn start:dev
```

## Test

Can you test all or access each project and test independent

```bash
# start all

# unit
$ yarn test

# unit coverage
$ yarn test:coverage
```

### Utils

```bash
# remove node_modules each package
$ yarn cl

# run lint in all package
$ yarn lint
```
