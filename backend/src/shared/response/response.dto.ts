import { HttpStatus } from '@nestjs/common';
import { Exclude, Expose } from 'class-transformer';

import { StatusEnum } from './status.enum';

/**
 * Represents the response that will be returned to the user.
 */
export class ResponseDto<T> {
  @Expose()
  public statusCode: number;
  @Expose()
  public message: unknown;
  @Expose()
  public data: T;
  // TODO: another solution to handle validation error
  // @Expose()
  // public errors?: Record<string, string[]>;
  @Exclude()
  public httpStatus: HttpStatus;

  constructor();
  constructor(statusCode?: number, message?: string, httpStatus?: HttpStatus) {
    this.statusCode = statusCode;
    this.message = message;
    this.httpStatus = httpStatus;
  }

  public setData(data: T) {
    this.data = data;
  }

  // TODO: another solution to handle validation error
  // public setErrors(errors: Record<string, string[]>) {
  //   this.errors = errors;
  // }

  setStatusEnum(statusEnum: StatusEnum) {
    this.statusCode = statusEnum.code;
    this.message = statusEnum.message;
    this.httpStatus = statusEnum.httpStatus;
  }
}
