import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DEFAULT_PORT, SWAGGER_ENDPOINT } from './common/constants';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import * as YAML from 'yaml';

const port = process.env.PORT || DEFAULT_PORT;

async function initSwagger(app: INestApplication) {
  const file = await readFile(join(__dirname, '../doc/api.yaml'), 'utf8');
  const swaggerDocument = YAML.parse(file);

  SwaggerModule.setup(SWAGGER_ENDPOINT, app, swaggerDocument);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  await initSwagger(app);

  await app.listen(port, () => {
    console.log(`Application is listening on port: ${port}`);
    console.log(
      `Swagger is accessible at: http://localhost:${port}/${SWAGGER_ENDPOINT}`,
    );
  });
}

bootstrap();
