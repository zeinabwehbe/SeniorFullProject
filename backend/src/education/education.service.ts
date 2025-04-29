import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Education } from './entities/education.entity';
import { EducationRepository } from './education.repository';
import { CreateEducationDto } from './dto/create-education.dto';
import { EducationResponseDto } from './dto/education.response.dto';
import { UpdateEducationDto } from './dto/update-education.dto';

@Injectable()
export class EducationService {
  constructor(private readonly educationRepository: EducationRepository) {}

  async findEducationById(id: number): Promise<Education> {
    const education = await this.educationRepository.findEducationById(id);
    if (!education) {
      throw new NotFoundException('Education record not found');
    }
    return education;
  }

  async create(createEducationDto: CreateEducationDto): Promise<EducationResponseDto> {
    const education = await this.educationRepository.insertEducation(createEducationDto);
    return education.toDto();
  }

  async findAllEducation(): Promise<EducationResponseDto[]> {
    const educationRecords = await this.educationRepository.findAllEducation();
    return educationRecords.map((education) => education.toDto());
  }

  async findAllEducationByUserId(userId: number): Promise<EducationResponseDto[]> {
    const educationRecords = await this.educationRepository.findAllEducationByUserId(userId);
    return educationRecords.map((education) => education.toDto());
  }

  async updateEducation(userId: number, educationId: number, updateEducationDto: UpdateEducationDto): Promise<EducationResponseDto> {
    const existingEducation = await this.educationRepository.findEducationById(educationId);
    if (!existingEducation || existingEducation.userId !== userId) {
      throw new NotFoundException('Education record not found for the specified user');
    }
    const updatedEducation = await this.educationRepository.updateEducation(existingEducation, updateEducationDto);
    return updatedEducation.toDto();
  }

  async deleteEducation(userId: number, educationId: number): Promise<void> {
    const existingEducation = await this.educationRepository.findEducationById(educationId);
    if (!existingEducation || existingEducation.userId !== userId) {
      throw new NotFoundException('Education record not found for the specified user');
    }
    await this.educationRepository.deleteEducation(existingEducation.id);
  }
}