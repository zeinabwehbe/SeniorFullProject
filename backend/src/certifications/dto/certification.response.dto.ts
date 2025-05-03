export interface CertificationResponseDto {
    id: number;
    userId: number;
    name: string;
    authority?: string;
    licenseNumber?: string;
    startDate?: Date;
    endDate?: Date;
    description?: string;
}