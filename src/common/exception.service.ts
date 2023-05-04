import {
  HttpException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { DatabaseService } from './database.service';
import { TypeORMError } from 'typeorm';

const parseExternalRequestError = (error: any) => ({
  statusCode: error.response?.statusCode,
  message: error.response?.message,
});

export class ExceptionService {
  logger: Logger = new Logger(ExceptionService.name);

  constructor(private databaseService = new DatabaseService()) {}

  handleExceptions(error: any): never {
    this.logger.error(error);

    const { statusCode, message } = parseExternalRequestError(error);

    console.log(error);
    if (statusCode && message) {
      throw new HttpException(message, statusCode);
    }

    if (error instanceof TypeORMError) {
      this.databaseService.handleDBExceptions(error);
    }

    throw new InternalServerErrorException(
      'Unexpected error, check server logs.',
    );
  }
}
