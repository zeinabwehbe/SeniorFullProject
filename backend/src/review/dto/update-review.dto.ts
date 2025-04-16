import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { UserRole } from './create-review.dto';

export class UpdateReviewDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  rating?: number;

  @IsOptional()
  @IsString()
  comment?: string;
}
