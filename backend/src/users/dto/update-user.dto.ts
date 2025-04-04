import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UserRole } from '../entities/user.entity';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  username?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  password?: string;
  
  @IsEnum(UserRole)
  @IsOptional()
  @IsNotEmpty()
  role: UserRole;
}