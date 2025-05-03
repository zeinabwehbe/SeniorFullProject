import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Experience } from './entities/experience.entity';
import { ExperienceRepository } from './experience.repository';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { ExperienceResponseDto } from './dto/experience.response.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';

@Injectable()
export class ExperienceService {
  constructor(private readonly experienceRepository: ExperienceRepository) {}

  async findExperienceById(id: number): Promise<Experience> {
    const experience = await this.experienceRepository.findExperienceById(id);
    if (!experience) {
      throw new NotFoundException('Experience record not found');
    }
    return experience;
  }

  async create(createExperienceDto: CreateExperienceDto): Promise<ExperienceResponseDto> {
    const experience = await this.experienceRepository.insertExperience(createExperienceDto);
    return experience.toDto();
  }

  async findAllExperience(): Promise<ExperienceResponseDto[]> {
    const experienceRecords = await this.experienceRepository.findAllExperience();
    return experienceRecords.map((experience) => experience.toDto());
  }

  async findAllExperienceByUserId(userId: number): Promise<ExperienceResponseDto[]> {
    const experienceRecords = await this.experienceRepository.findAllExperienceByUserId(userId);
    return experienceRecords.map((experience) => experience.toDto());
  }

  async updateExperience(userId: number, experienceId: number, updateExperienceDto: UpdateExperienceDto): Promise<ExperienceResponseDto> {
    const existingExperience = await this.experienceRepository.findExperienceById(experienceId);
    if (!existingExperience || existingExperience.userId !== userId) {
      throw new NotFoundException('Experience record not found for the specified user');
    }
    const updatedExperience = await this.experienceRepository.updateExperience(existingExperience, updateExperienceDto);
    return updatedExperience.toDto();
  }

  async deleteExperience(userId: number, experienceId: number): Promise<void> {
    const existingExperience = await this.experienceRepository.findExperienceById(experienceId);
    if (!existingExperience || existingExperience.userId !== userId) {
      throw new NotFoundException('Experience record not found for the specified user');
    }
    await this.experienceRepository.deleteExperience(existingExperience.id);
  }
}