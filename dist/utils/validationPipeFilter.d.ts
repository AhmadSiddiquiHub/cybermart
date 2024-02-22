import { ArgumentsHost, ExceptionFilter, HttpException } from '@nestjs/common';
export declare class ValidationExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost): void;
    private isValidationError;
    private extractValidationErrors;
}
