
import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { UserSkillService } from './user-skill.service';
import { CreateUserSkillDto } from './dto/create-user-skill.dto';
import { UpdateUserSkillDto } from './dto/update-user-skill.dto';
import { UserSkillResponseDto } from './dto/user-skill.response';
import { RolesGuard } from '../roles/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Request } from 'express';

@Controller('user-skills')
export class UserSkillController {
  private readonly logger = new Logger(UserSkillController.name);

  constructor(private readonly userSkillService: UserSkillService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createUserSkillDto:CreateUserSkillDto): Promise<UserSkillResponseDto> {
    return this.userSkillService.create(createUserSkillDto);
  }

  @Get()
  async findAll(): Promise<UserSkillResponseDto[]> {
    return this.userSkillService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<UserSkillResponseDto> {
    return this.userSkillService.findOne(id);
  }

  @Get('user/:userId')
  async findByUserId(@Param('userId', ParseIntPipe) userId: number): Promise<UserSkillResponseDto[]> {
    return this.userSkillService.findByUserId(userId);
  }

  @Get('skill/:skillId')
  async findBySkillId(@Param('skillId', ParseIntPipe) skillId: number): Promise<UserSkillResponseDto[]> {
    return this.userSkillService.findBySkillId(skillId);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserSkillDto: UpdateUserSkillDto,
  ): Promise<UserSkillResponseDto> {
    this.logger.log(`Updating user skill ${id} with data:`, updateUserSkillDto);
    try {
      const result = await this.userSkillService.update(id, updateUserSkillDto);
      this.logger.log(`Successfully updated user skill ${id}`);
      return result;
    } catch (error) {
      this.logger.error(`Error updating user skill ${id}:`, error);
      throw new HttpException(
        error.message || 'Failed to update user skill',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
    return this.userSkillService.remove(id);
  }

  @Get('status/:status')
  async findByApprovalStatus(@Param('status') status: string): Promise<UserSkillResponseDto[]> {
    try {
      return await this.userSkillService.findByApprovalStatus(status);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to fetch skills by status',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
} 



