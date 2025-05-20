import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsInt,
} from 'class-validator';

export class CreateEducationDto {
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsString()
  @IsNotEmpty()
  institution: string;

  @IsString()
  degree?: string;

  @IsString()
  fieldOfStudy: string;

  @IsInt()
  @IsOptional()
  startYear: number;

  @IsInt()
  @IsOptional()
  endYear?: number;

  @IsString()
  @IsOptional()
  description?: string;
}