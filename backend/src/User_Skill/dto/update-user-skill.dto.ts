import { IsEnum, IsInt, IsOptional } from 'class-validator';
import { SkillLevel, SkillType } from './create-user-skill.dto';

export class UpdateUserSkillDto {
  @IsOptional()
  @IsInt()
  user_id?: number;

  @IsOptional()
  @IsInt()
  skill_id?: number;

  @IsOptional()
  @IsEnum(SkillType)
  skill_type?: SkillType;

  @IsOptional()
  @IsEnum(SkillLevel)
  skill_level?: SkillLevel;
}