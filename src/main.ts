import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Main');
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      //* esto lo que hace es evitar que se envian propiedades que no esten definidas en la clase dto
      forbidNonWhitelisted: false,
    }),
  );
  await app.listen(envs.port);
  logger.log(`App is listening on port ${envs.port}`);
}
bootstrap();
