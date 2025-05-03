import {
    Injectable,
    NotFoundException,
  } from '@nestjs/common';
  import { Certification } from './entities/certification.entity';
  import { CertificationRepository } from './certification.repository';
  import { CreateCertificationDto } from './dto/create-certification.dto';
  import { CertificationResponseDto } from './dto/certification.response.dto';
  import { UpdateCertificationDto } from './dto/update-certification.dto';
  
  @Injectable()
  export class CertificationService {
    constructor(private readonly certificationRepository: CertificationRepository) {}
  
    async findCertificationById(id: number): Promise<Certification> {
      const certification = await this.certificationRepository.findCertificationById(id);
      if (!certification) {
        throw new NotFoundException('Certification not found');
      }
      return certification;
    }
  
    async create(createCertificationDto: CreateCertificationDto): Promise<CertificationResponseDto> {
      const certification = await this.certificationRepository.insertCertification(createCertificationDto);
      return certification.toDto();
    }
  
    async findAllCertifications(): Promise<CertificationResponseDto[]> {
      const certifications = await this.certificationRepository.findAllCertifications();
      return certifications.map((certification) => certification.toDto());
    }
  
    async findAllCertificationsByUserId(userId: number): Promise<CertificationResponseDto[]> {
      const certifications = await this.certificationRepository.findAllCertificationsByUserId(userId);
      return certifications.map((certification) => certification.toDto());
    }
  
    async updateCertification(userId: number, certificationId: number, updateCertificationDto: UpdateCertificationDto): Promise<CertificationResponseDto> {
      const existingCertification = await this.certificationRepository.findCertificationById(certificationId);
      if (!existingCertification || existingCertification.userId !== userId) {
        throw new NotFoundException('Certification not found for the specified user');
      }
      const updatedCertification = await this.certificationRepository.updateCertification(existingCertification, updateCertificationDto);
      return updatedCertification.toDto();
    }
  
    async deleteCertification(userId: number, certificationId: number): Promise<void> {
      const existingCertification = await this.certificationRepository.findCertificationById(certificationId);
      if (!existingCertification || existingCertification.userId !== userId) {
        throw new NotFoundException('Certification not found for the specified user');
      }
      await this.certificationRepository.deleteCertification(existingCertification.id);
    }
  }