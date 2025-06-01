import { HttpException } from '@nestjs/common';

import { StatusEnum } from '../shared/response/status.enum';

/**
 * Custom exception class that extends HttpException.
 * This class is used to create exceptions with custom properties.
 */
export class BaseException extends HttpException {
  public statusEnum: StatusEnum;
  public data;

  constructor(statusEnum: StatusEnum);
  constructor(statusEnum: StatusEnum, data);
  constructor(statusEnum: StatusEnum, data?) {
    super(statusEnum.message, statusEnum.httpStatus);
    this.statusEnum = statusEnum;
    this.data = data;
  }
}
