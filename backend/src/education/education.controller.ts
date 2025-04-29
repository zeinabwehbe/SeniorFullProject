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
import { EducationService } from './education.service';
import { Education } from './entities/education.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateEducationDto } from './dto/create-education.dto';
import { EducationResponseDto } from './dto/education.response.dto';
import { UpdateEducationDto } from './dto/update-education.dto';

@Controller('education')
export class EducationController {
  private readonly logger = new Logger(EducationController.name);

  constructor(private educationService: EducationService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createEducationDto: CreateEducationDto): Promise<EducationResponseDto> {
    const education = await this.educationService.create(createEducationDto);
    return education ;
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(): Promise<EducationResponseDto[]> {
    const educationRecords = await this.educationService.findAllEducation();
    return educationRecords.map((education) => education );
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<EducationResponseDto> {
    const education = await this.educationService.findEducationById(id);
    return education.toDto();
  }
}