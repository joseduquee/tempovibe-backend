<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Instructions to run in Development

1. Clone the repository

2. Clone file __.env.template__ and rename the copy to __.env__

3. Fill the environments variables defined in 
```
.env
```

4. Run to install dependencies
```
npm install
```

5. Run prisma migrations
```
npx prisma migrate dev
```

6. Run the BBDD
```
docker-compose up -d
```

7. Run dev application
```
npm run start:dev
```

8. Visit link
```
localhost:3035/graphql
```

9. Run Mutation: __"runSeed"__ to fill the database with information