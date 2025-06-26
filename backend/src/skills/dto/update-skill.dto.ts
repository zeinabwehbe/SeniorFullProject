

import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateSkillDto {
  @IsString()
  @IsOptional()
  skill_name?: string;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  category_id?: number;

  @IsString()
  @IsOptional()
  description?: string;

 
}


