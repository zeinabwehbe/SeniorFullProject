import { IsEmail, IsNotEmpty, IsObject } from 'class-validator';

export class SendCvEmailDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsObject()
  @IsNotEmpty()
  cvData: any; // Contains all CV information

  customMessage?: string;
}