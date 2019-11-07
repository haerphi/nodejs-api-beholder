# nodejs-api-beholder

## install

-   clone the repo & move in
-   `npm i`
-   `npm run build` or `npm run work`
-   `docker-compose up`
-   ignore error and create the database `beholder` in your postgres container (using tableplus or something else)

## Route:

-   POST `/register` : !email:string, !password:string, !nickname:string, firstname:string, lastname:string => {sucess, token||error}
-   POST `/login`: !email:string, !password:string => {sucess, token||error}

When connected with `Authorization : token` in the headers

-   GET `/getUser` => {}

-   GET `/getUniverses` => []{}

When connected as **admin** with `Authorization : token` in the headers

-   POST `/newUniverse`: !name:string, style:string

## TODO

-   install:
    -   creation de la table user + column
-   auth:
    -   middleware admin
-   user:
    -   edit user
