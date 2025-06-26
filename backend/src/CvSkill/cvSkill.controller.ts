import { Body, Controller, Get, Param, Post, Patch, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { CvSkillService } from './cvSkill.service';
import { CreateCvSkillDto } from './dto/create-cvSkill.dto';
import { UpdateCvSkillDto } from './dto/update-cvSkill.dto';
import { CvSkillResponseDto } from './dto/cvSkill.response.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../roles/roles.guard';

@Controller('users/:userId/cv-skills')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CvSkillController {
  constructor(private readonly cvSkillService: CvSkillService) {}

  @Get()
  async getUserCvSkills(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<CvSkillResponseDto[]> {
    return this.cvSkillService.findAllCvSkillsByUserId(userId);
  }

  @Post()
  async addCvSkill(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() createCvSkillDto: CreateCvSkillDto,
  ): Promise<CvSkillResponseDto> {
    createCvSkillDto.userId = userId;
    return this.cvSkillService.create(createCvSkillDto);
  }

  @Patch(':cvSkillId')
  async updateCvSkill(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('cvSkillId', ParseIntPipe) cvSkillId: number,
    @Body() updateCvSkillDto: UpdateCvSkillDto,
  ): Promise<CvSkillResponseDto> {
    return this.cvSkillService.updateCvSkill(userId, cvSkillId, updateCvSkillDto);
  }

  @Delete(':cvSkillId')
  async deleteCvSkill(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('cvSkillId', ParseIntPipe) cvSkillId: number,
  ): Promise<void> {
    await this.cvSkillService.deleteCvSkill(userId, cvSkillId);
  }
}
