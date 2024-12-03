import 'dotenv/config';
import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DEFAULT_PORT, SWAGGER_ENDPOINT } from './common/constants';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import * as YAML from 'yaml';
import { LoggerService } from './logger/logger.service';
import { LoggerHttpInterceptor } from './interceptors/logger.interceptor';
import { CatchEverythingFilter } from './filters/exceptions.filter';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from './auth/auth.guard';

const port = process.env.PORT || DEFAULT_PORT;

async function initSwagger(app: INestApplication) {
  const file = await readFile(join(__dirname, '../doc/api.yaml'), 'utf8');
  const swaggerDocument = YAML.parse(file);

  SwaggerModule.setup(SWAGGER_ENDPOINT, app, swaggerDocument);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  const loggerService = app.get(LoggerService);
  const httpAdapterHost = app.get(HttpAdapterHost);
  const jwtService = app.get(JwtService);
  const reflector = app.get(Reflector);

  app.useLogger(loggerService);
  app.useGlobalInterceptors(new LoggerHttpInterceptor(loggerService));
  app.useGlobalFilters(
    new CatchEverythingFilter(httpAdapterHost, loggerService),
  );
  app.useGlobalGuards(new AuthGuard(jwtService, reflector));
  app.useGlobalPipes(new ValidationPipe());

  await initSwagger(app);

  // Uncomment to cause bootstrap unhandled rejection
  // throw new Error(`Bootstrap error to cause it's rejection`);

  // Uncomment to cause uncaught exception
  // setTimeout(() => {
  //   throw new Error('Bootstrap error throw to log uncaught exception');
  // }, 500);

  await app.listen(port, () => {
    console.log(`Application is listening on port: ${port}`);
    console.log(
      `Swagger is accessible at: http://localhost:${port}/${SWAGGER_ENDPOINT}`,
    );
  });
}

bootstrap();
