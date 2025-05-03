import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { UserSkillRepository } from './user-skill.repository';
import { CreateUserSkillDto } from './dto/create-user-skill.dto';
import { UpdateUserSkillDto } from './dto/update-user-skill.dto';
import { UserSkillResponseDto } from './dto/user-skill.response';
import { UserSkill } from './entitiy/user-skill.entity';

@Injectable()
export class UserSkillService {
  constructor(private readonly userSkillRepository: UserSkillRepository) {}

  async create(createUserSkillDto: CreateUserSkillDto): Promise<UserSkillResponseDto> {
    const existingSkill = await this.userSkillRepository.findByUserId(createUserSkillDto.user_id);
    const hasDuplicate = existingSkill.some(
      skill => skill.skill_id === createUserSkillDto.skill_id && skill.skill_type === createUserSkillDto.skill_type && skill.skill_level === createUserSkillDto.skill_level
    );

    if (hasDuplicate) {
      throw new ConflictException('User already has this skill with the same type');
    }

    const userSkill = await this.userSkillRepository.create(createUserSkillDto);
    return this.mapToResponseDto(await this.userSkillRepository.findById(userSkill.id));
  }

  async findAll(): Promise<UserSkillResponseDto[]> {
    const userSkills = await this.userSkillRepository.findAll();
    return userSkills.map(skill => this.mapToResponseDto(skill));
  }

  async findOne(id: number): Promise<UserSkillResponseDto> {
    const userSkill = await this.userSkillRepository.findById(id);
    if (!userSkill) {
      throw new NotFoundException(`UserSkill with ID ${id} not found`);
    }
    return this.mapToResponseDto(userSkill);
  }

  async findByUserId(userId: number): Promise<UserSkillResponseDto[]> {
    const userSkills = await this.userSkillRepository.findByUserId(userId);
    return userSkills.map(skill => this.mapToResponseDto(skill));
  }

  async findBySkillId(skillId: number): Promise<UserSkillResponseDto[]> {
    const userSkills = await this.userSkillRepository.findBySkillId(skillId);
    return userSkills.map(skill => this.mapToResponseDto(skill));
  }

  async update(id: number, updateUserSkillDto: UpdateUserSkillDto): Promise<UserSkillResponseDto> {
    const userSkill = await this.userSkillRepository.findById(id);
    if (!userSkill) {
      throw new NotFoundException(`UserSkill with ID ${id} not found`);
    }
    const updated = await this.userSkillRepository.updateUserSkill(userSkill, updateUserSkillDto);
    return this.mapToResponseDto(updated);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.userSkillRepository.delete(id);
    if (!result) {
      throw new NotFoundException(`UserSkill with ID ${id} not found`);
    }
    return true;
  }

  public mapToResponseDto(userSkill: UserSkill): UserSkillResponseDto {
    return {
      id: userSkill.id,
      user_id: userSkill.user_id,
      skill_id: userSkill.skill_id,
      skill_type: userSkill.skill_type,
      skill_level: userSkill.skill_level,
      created_at: userSkill.created_at,
      updated_at: userSkill.updated_at,
      user: userSkill.user ? {
        id: userSkill.user.id,
        name: userSkill.user.name,
        bio: userSkill.user.bio,
        profilePic: userSkill.user.profilePic
      } : undefined,
      skill: userSkill.skill ? {
        id: userSkill.skill.id,
        skill_name: userSkill.skill.skill_name,
        category: userSkill.skill.category
      } : undefined
    };
  }
} 