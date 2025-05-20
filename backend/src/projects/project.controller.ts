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
import { ProjectService } from './project.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectResponseDto } from './dto/project.response.dto';

@Controller('projects')
export class ProjectController {
  private readonly logger = new Logger(ProjectController.name);

  constructor(private projectService: ProjectService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createProjectDto: CreateProjectDto): Promise<ProjectResponseDto> {
    const project = await this.projectService.create(createProjectDto);
    return project;
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(): Promise<ProjectResponseDto[]> {
    const projects = await this.projectService.findAllProjects();
    return projects;
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ProjectResponseDto> {
    const project = await this.projectService.findProjectById(id);
    return project.toDto();
  }
}