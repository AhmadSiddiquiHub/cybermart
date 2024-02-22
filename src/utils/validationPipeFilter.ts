/* eslint-disable prettier/prettier */
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { Request, Response } from 'express';

@Catch(HttpException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();

    if (exception instanceof HttpException) {
      const errorResponse = exception.getResponse() as {
        statusCode: number;
        message: Array<string> | string;
      };

      if (
        Array.isArray(errorResponse.message) &&
        this.isValidationError(errorResponse.message)
      ) {
        const validationErrors = this.extractValidationErrors(
          errorResponse.message as ValidationError[],
        );

        response.status(HttpStatus.BAD_REQUEST).json({
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Validation failed',
          errors: validationErrors,
          timestamp: new Date().toISOString(),
          path: request.url,
        });
      } else {
        const errObj = {
          ...errorResponse,
          status: 0,
          message: Array.isArray(errorResponse.message)
            ? errorResponse.message.join(' & ')
            : errorResponse.message,
        };

        response.status(errorResponse.statusCode).json(errObj);
      }
    }
  }

  private isValidationError(errors: any): errors is ValidationError[] {
    return (
      Array.isArray(errors) &&
      errors.every((error) => error instanceof ValidationError)
    );
  }

  private extractValidationErrors(
    errors: ValidationError[],
  ): Record<string, string[]> {
    const result: Record<string, string[]> = {};

    errors.forEach((error) => {
      Object.keys(error.constraints).forEach((key) => {
        if (!result[error.property]) {
          result[error.property] = [];
        }
        result[error.property].push(error.constraints[key]);
      });
    });

    return result;
  }
}
