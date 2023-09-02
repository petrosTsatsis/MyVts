### Run a postgres database using docker

```bash
docker run --name vts_db --rm -e  POSTGRES_PASSWORD=pass123 -e POSTGRES_DB=MyVTSdb --net=host -v pgsdata14:/var/lib/postgresql/data  -d postgres:14
```
After using the docker command and run the app to create the tables in the database you need to run the users.sql file in the assets directory to 
insert the default users in the database.

## remove db data
```bash
docker volume rm pgsdata14
```

## connect to database using psql

```bash
sudo apt install postgresl-client
psql -h localhost -U postgres -d MyVTSdb -p 5432 -W
```

| USER   | PASSWORD | ROLES  |
|--------|----------|--------|
| seller | 12345678 | SELLER |
| buyer  | 12345678 | BUYER  |
| admin  | 12345678 | ADMIN  |
 
API endpoints provided to register users

## Links:
* [install docker](https://tinyurl.com/2m3bhahn)
