import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}
export class CreateReviewDto {
  @IsInt()
  userId: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @IsOptional()
  @IsString()
  comment?: string;
}
