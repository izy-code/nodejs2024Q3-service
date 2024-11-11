# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Cloning the repository

```
git clone https://github.com/izy-code/nodejs2024Q3-service.git
```

## Installing NPM modules

```
npm ci
```

## Running application

Production mode:

```
npm start
```

Development mode:

```
npm run start:dev
```

By default, the application runs on port 4000. To change this, modify the **PORT** variable in the `.env` file.

Once the server is running, you can access the API endpoints using tools like Postman, cURL, or directly via a web browser.

## OpenAPI/Swagger

You can access the OpenAPI documentation by typing http://localhost:4000/doc/ in your browser.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

Once the application is running, open a new terminal and enter:

To run all tests without authorization

```
npm test
```

To run only one of all test suites

```
npm test -- <path to suite>
```

## Auto-fix and format

```
npm run lint
```

```
npm run format
```
