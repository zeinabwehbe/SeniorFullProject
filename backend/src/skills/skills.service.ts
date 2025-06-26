
import { Injectable, NotFoundException } from '@nestjs/common';
import { Skill } from './entities/skill.entity';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { SkillResponseDto } from './dto/skill.response';
import { SkillsRepository } from './skills.repository';

@Injectable()
export class SkillsService {
  constructor(private readonly skillsRepository: SkillsRepository) {}

  async findAll(): Promise<SkillResponseDto[]> {
    const skills = await this.skillsRepository.findAll();
    return skills.map(skill => this.mapToResponseDto(skill));
  }

  async findOne(id: number): Promise<SkillResponseDto> {
    const skill = await this.skillsRepository.findById(id);
    if (!skill) {
      throw new NotFoundException(`Skill with ID ${id} not found`);
    }
    return this.mapToResponseDto(skill);
  }

  async create(createSkillDto: CreateSkillDto): Promise<SkillResponseDto> {
    const skill = await this.skillsRepository.create(createSkillDto);
    return this.mapToResponseDto(skill);
  }

  async update(id: number, updateSkillDto: UpdateSkillDto): Promise<SkillResponseDto> {
    const skill = await this.skillsRepository.findById(id);
    if (!skill) {
      throw new NotFoundException(`Skill with ID ${id} not found`);
    }
    const updatedSkill = await this.skillsRepository.update(skill, updateSkillDto);
    return this.mapToResponseDto(updatedSkill);
  }

  async remove(id: number): Promise<boolean> {
    const skill = await this.skillsRepository.findById(id);
    if (!skill) {
      throw new NotFoundException(`Skill with ID ${id} not found`);
    }
    return this.skillsRepository.delete(id);
  }
  
  async findByCategory(categoryId: number): Promise<SkillResponseDto[]> {
    const skills = await this.skillsRepository.findByCategory(categoryId);
    return skills.map(skill => this.mapToResponseDto(skill));
  }
  
  async searchByName(name: string): Promise<SkillResponseDto[]> {
    const skills = await this.skillsRepository.searchByName(name);
    return skills.map(skill => this.mapToResponseDto(skill));
  }
  

  
  /**
   * Map a Skill entity to a SkillResponseDto
   * @param skill The Skill entity to map
   * @returns A SkillResponseDto
   */
  private mapToResponseDto(skill: Skill): SkillResponseDto {
    return {
      id: skill.id,
      skill_name: skill.skill_name,
      category_id: skill.category_id,
      description: skill.description,
      
      category: skill.category,
      createdAt: skill.createdAt,
      updatedAt: skill.updatedAt
    };
  }
} 

