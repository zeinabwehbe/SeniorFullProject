import { IsNotEmpty, IsString, IsOptional, IsDateString, IsInt } from 'class-validator';

export class CreateExperienceDto {
    @IsInt()
    @IsNotEmpty()
    userId: number;

    @IsNotEmpty()
    @IsString()
    jobTitle: string;

    @IsNotEmpty()
    @IsString()
    company: string;

    @IsOptional()
    @IsDateString()
    startDate?: Date;

    @IsOptional()
    @IsDateString()
    endDate?: Date;

    @IsOptional()
    @IsString()
    description?: string;
}