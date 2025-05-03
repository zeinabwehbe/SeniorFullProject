import {
  Controller,
  Post,
  Body,
  Param,
  UseGuards,
  Logger,
  Patch,
  Get,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { Experience } from './entities/experience.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { ExperienceResponseDto } from './dto/experience.response.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';

@Controller('experience')
export class ExperienceController {
  private readonly logger = new Logger(ExperienceController.name);

  constructor(private experienceService: ExperienceService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createExperienceDto: CreateExperienceDto): Promise<ExperienceResponseDto> {
    const experience = await this.experienceService.create(createExperienceDto);
    return experience;
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(): Promise<ExperienceResponseDto[]> {
    const experienceRecords = await this.experienceService.findAllExperience();
    return experienceRecords;
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ExperienceResponseDto> {
    const experience = await this.experienceService.findExperienceById(id);
    return experience.toDto();
  }
}