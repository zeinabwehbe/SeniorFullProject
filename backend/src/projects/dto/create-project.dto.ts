import { IsNotEmpty, IsString, IsOptional, IsDateString, IsInt } from 'class-validator';

export class CreateProjectDto {
    @IsInt()
    @IsNotEmpty()
    userId: number;

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsString()
    link?: string;

    @IsOptional()
    @IsDateString()
    startDate?: Date;

    @IsOptional()
    @IsDateString()
    endDate?: Date;
}