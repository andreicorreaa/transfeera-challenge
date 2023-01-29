# Transfeera

An API developed for the Software Engineer Full Stack job at Transfeera.

This project has as main libraries Node.js, Express.js, Typescript and MongoDB. Seeks to apply SOLID concepts, clean code, standard repository, etc.

## Prerequisites

- node >= 18.13.0
- yarn >= 1.22.19
- docker-compose >= 2.15.1
- migrate-mongo >= 9.0.0

## Installation

1. Install all packages
```bash
yarn install
```

2. Execute docker-compose
```bash
docker-compose up -d
```

3. Execute migrations
```bash
yarn migrate:up
```

## Usage

```bash
yarn start:dev
```
