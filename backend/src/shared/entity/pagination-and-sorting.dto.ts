import { Transform, Type } from 'class-transformer';
import {
  IsOptional,
  IsString,
  IsInt,
  Min,
  IsIn,
  IsBoolean,
} from 'class-validator';

/**
 * Data Transfer Object (DTO) for pagination and sorting.
 *
 * The `PaginationAndSortingDto` class is used to encapsulate and validate
 * pagination and sorting parameters that can be applied to API endpoints.
 * It includes optional parameters for sorting, ordering, limit, and offset.
 */
export class PaginationAndSortingDto {
  @IsOptional()
  @IsString()
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim() : undefined,
  )
  sort?: string;

  @IsOptional()
  @IsString()
  @IsIn(['ASC', 'DESC']) // Enforce valid order values
  order?: 'ASC' | 'DESC' = 'ASC'; // Default order

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  limit?: number = 10; // Default limit

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1; // Default page

  @IsOptional()
  @Transform(({ value }) => value.toLowerCase() === 'true')
  @IsBoolean()
  getAll?: boolean = false; // Default to false for pagination

  /**
   * Calculates the offset based on the page number and limit.
   * This ensures consistent offset calculation across the app.
   */
  get offset() {
    return (this.page - 1) * this.limit;
  }
}
