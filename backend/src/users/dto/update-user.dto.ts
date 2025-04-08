import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UserRole } from '../dto/create-user.dto';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  name?: string;

  @IsEmail()
  @IsOptional()
  @IsNotEmpty()
  email?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  password?: string;
  
  @IsString()
  @IsOptional()
  bio?: string;

  @IsString()
  @IsOptional()
  profile_pic?: string;
  
  @IsEnum(UserRole)
  @IsOptional()
  @IsNotEmpty()
  role?: UserRole;
}