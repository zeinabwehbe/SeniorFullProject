import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Transaction } from 'sequelize';
import { Education } from './entities/education.entity';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';

@Injectable()
export class EducationRepository {
  constructor(
    @InjectModel(Education)
    private readonly educationModel: typeof Education,
  ) {}

  async findEducationById(id: number): Promise<Education | null> {
    return await this.educationModel.findOne({ where: { id } });
  }

  async findAllEducation(): Promise<Education[]> {
    return this.educationModel.findAll();
  }

  async findAllEducationByUserId(userId: number): Promise<Education[]> {
    return this.educationModel.findAll({ where: { userId } });
  }

  async insertEducation(
    createEducationDto: CreateEducationDto,
    transaction?: Transaction,
  ): Promise<Education> {
    return this.educationModel.create(createEducationDto, { transaction });
  }

  async updateEducation(education: Education, updateEducationDto: UpdateEducationDto): Promise<Education> {
    return await education.update(updateEducationDto);
  }

  async deleteEducation(id: number): Promise<void> {
    await this.educationModel.destroy({ where: { id } });
  }
}