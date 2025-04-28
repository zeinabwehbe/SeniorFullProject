import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApprovalStatus } from '../entities/skill.entity';

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

  @IsEnum(ApprovalStatus)
  @IsOptional()
  approval_status?: ApprovalStatus;
}
