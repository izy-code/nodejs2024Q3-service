import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DEFAULT_PORT } from './common/constants';
import { ValidationPipe } from '@nestjs/common';

const port = process.env.PORT || DEFAULT_PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port, () =>
    console.log(`Application is listening on port: ${port}`),
  );
}

bootstrap();
