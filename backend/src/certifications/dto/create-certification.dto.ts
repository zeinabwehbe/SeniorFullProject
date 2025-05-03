import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsInt,
    IsDateString,
  } from 'class-validator';
  
  export class CreateCertificationDto {
    @IsInt()
    @IsNotEmpty()
    userId: number;
  
    @IsString()
    @IsNotEmpty()
    name: string;
  
    @IsString()
    @IsOptional()
    authority?: string;
  
    @IsString()
    @IsOptional()
    licenseNumber?: string;
  
    @IsDateString()
    @IsOptional()
    startDate?: Date;
  
    @IsDateString()
    @IsOptional()
    endDate?: Date;
  
    @IsString()
    @IsOptional()
    description?: string;
  }