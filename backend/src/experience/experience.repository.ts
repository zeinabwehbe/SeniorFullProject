import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Transaction } from 'sequelize';
import { Experience } from './entities/experience.entity';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';

@Injectable()
export class ExperienceRepository {
  constructor(
    @InjectModel(Experience)
    private readonly experienceModel: typeof Experience,
  ) {}

  async findExperienceById(id: number): Promise<Experience | null> {
    return await this.experienceModel.findOne({ where: { id } });
  }

  async findAllExperience(): Promise<Experience[]> {
    return this.experienceModel.findAll();
  }

  async findAllExperienceByUserId(userId: number): Promise<Experience[]> {
    return this.experienceModel.findAll({ where: { userId } });
  }

  async insertExperience(
    createExperienceDto: CreateExperienceDto,
    transaction?: Transaction,
  ): Promise<Experience> {
    return this.experienceModel.create(createExperienceDto, { transaction });
  }

  async updateExperience(experience: Experience, updateExperienceDto: UpdateExperienceDto): Promise<Experience> {
    return await experience.update(updateExperienceDto);
  }

  async deleteExperience(id: number): Promise<void> {
    await this.experienceModel.destroy({ where: { id } });
  }
}