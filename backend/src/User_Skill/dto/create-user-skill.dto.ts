import { IsEnum, IsInt, IsNotEmpty, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export enum ApprovalStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected'
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

  @IsEnum(SkillLevel)
  @IsNotEmpty()
  skill_level: SkillLevel;

  /**
   * The approval status of the skill
   * @example "pending"
   */
  @IsEnum(ApprovalStatus)
  @IsNotEmpty()
  approval_status: ApprovalStatus = ApprovalStatus.PENDING;
} 