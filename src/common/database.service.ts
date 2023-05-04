import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

export class DatabaseService {
  errorCodesToInformFront: Array<string>;

  constructor() {
    this.errorCodesToInformFront = ['23503', '23505', '22P02'];
  }

  handleDBExceptions(error: any): never {
    if (this.errorCodesToInformFront.includes(error.code)) {
      throw new BadRequestException(error.detail);
    }
    throw new InternalServerErrorException(
      'Unexpected error, check server logs.',
    );
  }
}
