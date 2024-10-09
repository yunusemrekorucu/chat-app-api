import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './_common/exceptions/http-exception.filter';
import { swaggerConfig } from './_common/swagger/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        for (const error of errors) {
          if (error.constraints)
            return new BadRequestException(error.constraints);
        }
      },
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
