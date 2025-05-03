export interface ProjectResponseDto {
    id: number;
    userId: number;
    title: string;
    description?: string;
    link?: string;
    startDate?: Date;
    endDate?: Date;
}