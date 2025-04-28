import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserSkill } from './entitiy/user-skill.entity';
import { CreateUserSkillDto } from './dto/create-user-skill.dto';
import { UpdateUserSkillDto } from './dto/update-user-skill.dto';
import { User } from '../users/entities/user.entity';
import { Skill } from '../skills/entities/skill.entity';
import { Category } from '../categories/entities/category.entity';

@Injectable()
export class UserSkillRepository {
  constructor(
    @InjectModel(UserSkill)
    private readonly userSkillModel: typeof UserSkill,
  ) {}

  async create(createUserSkillDto: CreateUserSkillDto): Promise<UserSkill> {
    return this.userSkillModel.create(createUserSkillDto);
  }

  async findAll(): Promise<UserSkill[]> {
    return this.userSkillModel.findAll({
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'bio', 'profile_pic']
        },
        {
          model: Skill,
          as: 'skill',
          attributes: ['id', 'skill_name'],
          include: [{
            model: Category,
            as: 'category',
            attributes: ['id', 'name']
          }]
        }
      ]
    });
  }

  async findById(id: number): Promise<UserSkill> {
    return this.userSkillModel.findByPk(id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'bio', 'profile_pic']
        },
        {
          model: Skill,
          as: 'skill',
          attributes: ['id', 'skill_name'],
          include: [{
            association: 'category',
            attributes: ['id', 'name']
          }]
        }
      ]
    });
  }

  async findByUserId(userId: number): Promise<UserSkill[]> {
    return this.userSkillModel.findAll({
      where: { user_id: userId },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'bio', 'profile_pic']
        },
        {
          model: Skill,
          as: 'skill',
          attributes: ['id', 'skill_name'],
          include: [{
            association: 'category',
            attributes: ['id', 'name']
          }]
        }
      ]
    });
  }

  async findBySkillId(skillId: number): Promise<UserSkill[]> {
    return this.userSkillModel.findAll({
      where: { skill_id: skillId },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'bio', 'profile_pic']
        },
        {
          model: Skill,
          as: 'skill',
          attributes: ['id', 'skill_name'],
          include: [{
            association: 'category',
            attributes: ['id', 'name']
          }]
        }
      ]
    });
  }

  async updateUserSkill(userSkill: UserSkill, updateDto: UpdateUserSkillDto): Promise<UserSkill> {
    await userSkill.update(updateDto);
    return this.findById(userSkill.id);
  }

  async delete(id: number): Promise<boolean> {
    return (await this.userSkillModel.destroy({
      where: { id },
    })) > 0;
  }
} 