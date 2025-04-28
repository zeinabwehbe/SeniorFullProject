import { IsEnum, IsInt, IsNotEmpty, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export enum SkillType {
  TEACH = 'teach',
  LEARN = 'learn'
}

export enum SkillLevel {
  BEGINNER = 'Beginner',
  INTERMEDIATE = 'Intermediate',
  ADVANCED = 'Advanced'
}

export class CreateUserSkillDto {
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  user_id: number;

  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  skill_id: number;

  @IsEnum(SkillType, { message: 'Skill type must be either teach or learn' })
  @IsNotEmpty()
  skill_type: SkillType;

  @IsEnum(SkillLevel, { message: 'Skill level must be Beginner, Intermediate, or Advanced' })
  @IsNotEmpty()
  skill_level: SkillLevel;
} 