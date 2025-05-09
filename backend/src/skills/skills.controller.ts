import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpException, Query,UseGuards} from '@nestjs/common';
import { SkillsService } from './skills.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { SkillResponseDto } from './dto/skill.response';
import { RolesGuard } from '../roles/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Get()
  async findAll(): Promise<SkillResponseDto[]> {
    try {
      return await this.skillsService.findAll();
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to fetch skills',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<SkillResponseDto> {
    try {
      return await this.skillsService.findOne(Number(id));
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to fetch skill',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  
  @UseGuards(JwtAuthGuard)
  async create(@Body() createSkillDto: CreateSkillDto): Promise<SkillResponseDto> {
    try {
      return await this.skillsService.create(createSkillDto);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to create skill',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSkillDto: UpdateSkillDto,
  ): Promise<SkillResponseDto> {
    try {
      return await this.skillsService.update(Number(id), updateSkillDto);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to update skill',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    try {
      await this.skillsService.remove(Number(id));
      return { message: 'Skill deleted successfully' };
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to delete skill',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('category/:categoryId')
  async findByCategory(@Param('categoryId') categoryId: number): Promise<SkillResponseDto[]> {
    try {
      return await this.skillsService.findByCategory(categoryId);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to fetch skills by category',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('search')
  async searchByName(@Query('name') name: string): Promise<SkillResponseDto[]> {
    try {
      return await this.skillsService.searchByName(name);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to search skills',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('status/:status')
  async findByApprovalStatus(@Param('status') status: string): Promise<SkillResponseDto[]> {
    try {
      return await this.skillsService.findByApprovalStatus(status);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to fetch skills by status',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
} 