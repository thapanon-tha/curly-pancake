## Postman API Docs

```bash
Interview.postman_collection.json
```

## Docker Installation

```bash
$ docker compose -f "database-docker-compose.yml" up -d --build
```

after run database docker compose run below command for start app

```bash
$ docker compose -f "core-docker-compose.yml" up -d --build
```

---

## Nest Installation

```bash
$ npm install
```

## Running the app

```bash
# generate PrismaORM
$ npm run prisma:generate
```

## seed data to datebase (Optional)

```bash
# development
$ npm run prisma:seed
```

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
