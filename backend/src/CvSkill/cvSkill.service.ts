import { Injectable, NotFoundException } from '@nestjs/common';
import { CvSkill } from './entities/cv-skill.entity';
import { CvSkillRepository } from './cvSkill.repository';
import { CreateCvSkillDto } from './dto/create-cvSkill.dto';
import { CvSkillResponseDto } from './dto/cvSkill.response.dto';
import { UpdateCvSkillDto } from './dto/update-cvSkill.dto';

@Injectable()
export class CvSkillService {
  constructor(private readonly cvSkillRepository: CvSkillRepository) {}

  async findCvSkillById(id: number): Promise<CvSkill> {
    const cvSkill = await this.cvSkillRepository.findCvSkillById(id);
    if (!cvSkill) {
      throw new NotFoundException('CV Skill not found');
    }
    return cvSkill;
  }

  async create(createCvSkillDto: CreateCvSkillDto): Promise<CvSkillResponseDto> {
    const cvSkill = await this.cvSkillRepository.insertCvSkill(createCvSkillDto);
    return this.toResponseDto(cvSkill);
  }

  async findAllCvSkills(): Promise<CvSkillResponseDto[]> {
    const cvSkills = await this.cvSkillRepository.findAllCvSkills();
    return cvSkills.map((cvSkill) => this.toResponseDto(cvSkill));
  }

  async findAllCvSkillsByUserId(userId: number): Promise<CvSkillResponseDto[]> {
    const cvSkills = await this.cvSkillRepository.findAllCvSkillsByUserId(userId);
    return cvSkills.map((cvSkill) => this.toResponseDto(cvSkill));
  }

  async updateCvSkill(userId: number, id: number, updateCvSkillDto: UpdateCvSkillDto): Promise<CvSkillResponseDto> {
    const existingCvSkill = await this.cvSkillRepository.findCvSkillByIdAndUserId(id, userId);
    if (!existingCvSkill) {
      throw new NotFoundException('CV Skill not found for the specified user');
    }
    const updatedCvSkill = await this.cvSkillRepository.updateCvSkillByUserId(existingCvSkill, updateCvSkillDto);
    return this.toResponseDto(updatedCvSkill);
  }

  async deleteCvSkill(userId: number, id: number): Promise<void> {
    const existingCvSkill = await this.cvSkillRepository.findCvSkillByIdAndUserId(id, userId);
    if (!existingCvSkill) {
      throw new NotFoundException('CV Skill not found for the specified user');
    }
    await this.cvSkillRepository.deleteCvSkillByUserId(id, userId);
  }

  private toResponseDto(cvSkill: CvSkill): CvSkillResponseDto {
    return {
      id: cvSkill.id,
      userId: cvSkill.userId,
      skillId: cvSkill.skillId,
      skillName: cvSkill.skillName,
      level: cvSkill.level,
    };
  }
}