import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { BaseResponse } from 'src/_base/base.response';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response: Response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    const messageData = exception.getResponse() as string;
    const firstMessage = messageData[Object.keys(messageData)[0]];

    response.status(status).json(new BaseResponse(null, firstMessage, false));
  }
}
