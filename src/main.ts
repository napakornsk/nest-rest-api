import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    enableDebugMessages: true,
    disableErrorMessages: false,
  }))
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
