import { IsString, IsOptional } from 'class-validator';
import { CreateCategoryDto } from './create-category.dto';

/**
 * Data Transfer Object for updating an existing category
 * Extends the CreateCategoryDto and makes all fields optional
 */
export class UpdateCategoryDto {
  /**
   * The name of the category
   * @example "Programming"
   */
  @IsString()
  @IsOptional()
  name?: string;

  /**
   * The profile picture URL for the category
   * @example "https://example.com/images/programming.jpg"
   */
  @IsString()
  @IsOptional()
  profile_pic?: string;
} 