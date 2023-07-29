import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma?.PrismaClientKnownRequestError, Error)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception.code) {
      switch (exception.code) {
        case 'P2025':
          this.catchBadRequestError(
            exception,
            response,
            exception.meta
              ? `[ ${exception.meta?.cause} ]`
              : 'An operation failed because it depends on one or more records that were required but not found',
          );
          break;
        case 'P2002':
          this.catchBadRequestError(
            exception,
            response,
            `Unique constraint failed on the fields: [ ${exception.meta?.target} ]`,
          );
          break;
        case 'P2003':
          this.catchBadRequestError(
            exception,
            response,
            'Foreign key constraint failed on some field',
          );
          break;
        default:
          this.unhandledException(exception, host);
          break;
      }
    } else {
      switch (exception.name) {
        case 'NotFoundError':
          this.catchNotFound(exception, response);
          break;
        default:
          this.unhandledException(exception, host);
          break;
      }
    }
  }

  catchNotFound(
    exception: Prisma.PrismaClientKnownRequestError,
    response: Response,
  ) {
    const status = HttpStatus.NOT_FOUND;
    response.status(status).json({
      statusCode: status,
      message: exception.message,
    });
  }

  catchBadRequestError(
    exception: Prisma.PrismaClientKnownRequestError,
    response: Response,
    message: string,
  ) {
    const status = HttpStatus.BAD_REQUEST;
    response.status(status).json({
      statusCode: status,
      message: message,
    });
  }

  unhandledException(
    exception: Prisma.PrismaClientKnownRequestError,
    host: ArgumentsHost,
  ) {
    // default 500 error code
    super.catch(exception, host);
  }
}
