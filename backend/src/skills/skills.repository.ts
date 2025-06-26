
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Skill } from './entities/skill.entity';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { Category } from '../categories/entities/category.entity';
import { Op } from 'sequelize';

@Injectable()
export class SkillsRepository {
  constructor(
    @InjectModel(Skill)
    private skillModel: typeof Skill,
  ) {}

  async create(createSkillDto: CreateSkillDto): Promise<Skill> {
    const skill = await this.skillModel.create(createSkillDto);
    return this.findById(skill.id);
  }

  async findAll(): Promise<Skill[]> {
    return this.skillModel.findAll({
      include: [{
        model: Category,
        as: 'category'
      }]
    });
  }

  async findById(id: number): Promise<Skill> {
    return this.skillModel.findByPk(id, {
      include: [{
        model: Category,
        as: 'category'
      }]
    });
  }

  async findByCategory(categoryId: number): Promise<Skill[]> {
    return this.skillModel.findAll({
      where: { category_id: categoryId },
      include: [{
        model: Category,
        as: 'category'
      }]
    });
  }

  async update(skill: Skill, dto: UpdateSkillDto): Promise<Skill> {
    await skill.update(dto);
    return this.findById(skill.id);
  }

  async delete(id: number): Promise<boolean> {
    const deleted = await this.skillModel.destroy({
      where: { id }
    });
    return deleted > 0;
  }

  async searchByName(name: string): Promise<Skill[]> {
    return this.skillModel.findAll({
      where: {
        skill_name: {
          [Op.like]: `%${name}%`,
        },
      },
      include: ['category'],
    });
  }


} 



