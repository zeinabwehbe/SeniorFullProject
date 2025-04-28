import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { UserSkillService } from './user-skill.service';
import { CreateUserSkillDto } from './dto/create-user-skill.dto';
import { UpdateUserSkillDto } from './dto/update-user-skill.dto';
import { UserSkillResponseDto } from './dto/user-skill.response';

@Controller('user-skills')
export class UserSkillController {
  constructor(private readonly userSkillService: UserSkillService) {}

  @Post()
  async create(@Body() createUserSkillDto: CreateUserSkillDto): Promise<UserSkillResponseDto> {
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
    return this.userSkillService.update(id, updateUserSkillDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
    return this.userSkillService.remove(id);
  }
} 