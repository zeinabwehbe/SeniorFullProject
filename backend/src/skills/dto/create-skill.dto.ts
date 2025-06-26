
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';

/**
 * Data Transfer Object for creating a new skill
 */
export class CreateSkillDto {
  /**
   * The name of the skill
   * @example "JavaScript"
   */
  @IsString()
  @IsNotEmpty()
  skill_name: string;

  /**
   * The ID of the category this skill belongs to
   * @example 1
   */
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  category_id: number;

  /**
   * A description of the skill
   * @example "Modern JavaScript programming language"
   */
  @IsString()
  description: string;


} 



