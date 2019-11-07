# nodejs-api-beholder

## install
- clone the repo & move in
- `npm i`
- 'npm run build` or `npm run work`
- `docker-compose up`
- ignore error and create the database `beholder` in your postgres container (using tableplus or something else)

## Route:

-   POST `/register` : !email, !password, !nickname, firstname, lastname => {sucess, message||error}
-   POST `/login`: !email, !password => {sucess, message||error}
