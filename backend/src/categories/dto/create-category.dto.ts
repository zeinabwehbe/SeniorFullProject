import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

/**
 * Data Transfer Object for creating a new category
 */
export class CreateCategoryDto {
  /**
   * The name of the category
   * @example "Programming"
   */
  @IsString()
  @IsNotEmpty()
  name: string;

  /**
   * The profile picture URL for the category
   * @example "https://example.com/images/programming.jpg"
   */
  @IsString()
  @IsNotEmpty()
  profile_pic: string;

 
}
