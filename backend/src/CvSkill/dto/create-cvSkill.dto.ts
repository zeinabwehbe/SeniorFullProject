import { IsInt, IsString, IsNotEmpty } from 'class-validator';

export class CreateCvSkillDto {
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsInt()
  @IsNotEmpty()
  skillId: number;

  @IsString()
  @IsNotEmpty()
  skillName: string;

  @IsString()
  @IsNotEmpty()
  level: string;
}