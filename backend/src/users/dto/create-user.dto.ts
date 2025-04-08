import { IsString, IsNotEmpty, IsEmail, IsEnum, IsOptional } from 'class-validator';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin'
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsString()
  @IsOptional()
  profilePic?: string;

  @IsEnum(UserRole)
  @IsNotEmpty()
  role: UserRole;
}
