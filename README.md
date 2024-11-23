# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Cloning the repository

```
git clone https://github.com/izy-code/nodejs2024Q3-service.git
```
Don't forget to choose `docker-and-database` branch.

## Installing NPM modules

```
npm ci
```

## Environment variables

App needs a `.env` file in the root directory of the project with following environment variables:

- **PORT**: The port number of the backend application and Swagger docs.
- **POSTGRES_HOST**: The hostname of the Postgres database.
- **POSTGRES_PORT**: The port number of the Postgres database.
- **POSTGRES_USER**: The username for accessing the Postgres database.
- **POSTGRES_PASSWORD**: The password for accessing the Postgres database.
- **DATABASE_URL**: The connection URL for the Prisma ORM.

## Running application

```
npm run docker:up
```

By default, the application runs on port 4000. To change this, modify the **PORT** variable in the `.env` file.

Once the server is running, you can access the API endpoints using tools like Postman, cURL, or directly via a web browser.

## Stopping application

```
npm run docker:down
```

## OpenAPI/Swagger

You can access the OpenAPI documentation by typing http://localhost:4000/doc/ in your browser. Swagger port corresponds to **PORT** variable in the `.env` file.

For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

Before testing make sure that Docker doesn't have any other running containers and that app and Postgres ports configured in `.env` are free.

Once the application is running, open a new terminal and enter:

- To run all tests without authorization

```
npm test
```

- To run only one of all test suites

```
npm test -- <path to suite>
```

- To run all test with authorization

```
npm run test:auth
```

- To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

## Vulnerabilities scanning

Before scanning you should login into Docker account in Docker Desktop.

After that run following command in terminal:

```
npm run docker:scan
```

## Auto-fix and format

```
npm run lint
```

```
npm run format
```

## Docker volumes

Database files and logs are stored in `postgres-data-and-logs` volume. Logs could be find inside `logs` folder in that volume.