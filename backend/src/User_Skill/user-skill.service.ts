

import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { UserSkillRepository } from './user-skill.repository';
import { CreateUserSkillDto } from './dto/create-user-skill.dto';
import { UpdateUserSkillDto } from './dto/update-user-skill.dto';
import { UserSkillResponseDto } from './dto/user-skill.response';
import { UserSkill } from './entitiy/user-skill.entity';
import { ApprovalStatus } from './dto/create-user-skill.dto';

@Injectable()
export class UserSkillService {
  constructor(private readonly userSkillRepository: UserSkillRepository) {}

  async create(createUserSkillDto: CreateUserSkillDto): Promise<UserSkillResponseDto> {
    const existingSkill = await this.userSkillRepository.findByUserId(createUserSkillDto.user_id);
    const hasDuplicate = existingSkill.some(
      skill => skill.skill_id === createUserSkillDto.skill_id  && skill.skill_level === createUserSkillDto.skill_level
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


  async findByApprovalStatus(status: string): Promise<UserSkillResponseDto[]> {
    const userskills = await this.userSkillRepository.findByApprovalStatus(status);
    return userskills.map(userskills => this.mapToResponseDto(userskills));
  }

  async update(id: number, updateUserSkillDto: UpdateUserSkillDto): Promise<UserSkillResponseDto> {
    try {
      const userSkill = await this.userSkillRepository.findById(id);
      if (!userSkill) {
        throw new NotFoundException(`UserSkill with ID ${id} not found`);
      }

      // Validate the approval status if it's being updated
      if (updateUserSkillDto.approval_status) {
        const status = updateUserSkillDto.approval_status.toLowerCase();
        if (!Object.values(ApprovalStatus).includes(status as ApprovalStatus)) {
          throw new Error(`Invalid approval status: ${status}`);
        }
        updateUserSkillDto.approval_status = status as ApprovalStatus;
      }

      const updated = await this.userSkillRepository.updateUserSkill(userSkill, updateUserSkillDto);
      return this.mapToResponseDto(updated);
    } catch (error) {
      console.error('Error in update method:', error);
      throw error;
    }
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
      } : undefined,
      approval_status: userSkill.approval_status
    };
  }
} 