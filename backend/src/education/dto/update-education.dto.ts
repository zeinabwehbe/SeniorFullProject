import {
  IsString,
  IsOptional,
  IsInt,
} from 'class-validator';

export class UpdateEducationDto {
  @IsInt()
  @IsOptional()
  userId?: number;

  @IsString()
  @IsOptional()
  institution?: string;

  @IsString()
  @IsOptional()
  degree?: string;

  @IsString()
  @IsOptional()
  fieldOfStudy?: string;

  @IsInt()
  @IsOptional()
  startYear?: number;

  @IsInt()
  @IsOptional()
  endYear?: number;

  @IsString()
  @IsOptional()
  description?: string;
}