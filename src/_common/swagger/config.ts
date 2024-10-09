import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Chat App')
  .setDescription('The ChatApp API description')
  .setVersion('1.0')
  .build();
