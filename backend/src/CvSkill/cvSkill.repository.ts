import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Transaction } from 'sequelize';
import { CvSkill } from './entities/cv-skill.entity';
import { CreateCvSkillDto } from './dto/create-cvSkill.dto';
import { UpdateCvSkillDto } from './dto/update-cvSkill.dto';
// import { UpdateCvSkillDto } from './dto/update-cvSkill.dto'; // Uncomment if you add an update DTO

@Injectable()
export class CvSkillRepository {
  constructor(
    @InjectModel(CvSkill)
    private readonly cvSkillModel: typeof CvSkill,
  ) {}

  async findCvSkillById(id: number): Promise<CvSkill | null> {
    return await this.cvSkillModel.findOne({ where: { id } });
  }

  async findAllCvSkills(): Promise<CvSkill[]> {
    return this.cvSkillModel.findAll();
  }

  async insertCvSkill(
    createCvSkillDto: CreateCvSkillDto,
    transaction?: Transaction,
  ): Promise<CvSkill> {
    return this.cvSkillModel.create(createCvSkillDto as any, { transaction });
  }

   async updateCvSkill(cvSkill: CvSkill, updateCvSkillDto: UpdateCvSkillDto): Promise<CvSkill> {
    return await cvSkill.update(updateCvSkillDto);
  }

  async deleteCvSkill(id: number): Promise<void> {
    await this.cvSkillModel.destroy({ where: { id } });
  }

  async findAllCvSkillsByUserId(userId: number): Promise<CvSkill[]> {
    return this.cvSkillModel.findAll({ where: { userId } });
  }

  async findCvSkillByIdAndUserId(id: number, userId: number): Promise<CvSkill | null> {
    return this.cvSkillModel.findOne({ where: { id, userId } });
  }

  async updateCvSkillByUserId(cvSkill: CvSkill, updateCvSkillDto: UpdateCvSkillDto): Promise<CvSkill> {
    return await cvSkill.update(updateCvSkillDto);
  }

  async deleteCvSkillByUserId(id: number, userId: number): Promise<void> {
    await this.cvSkillModel.destroy({ where: { id, userId } });
  }
}
