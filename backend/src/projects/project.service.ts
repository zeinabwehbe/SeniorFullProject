import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Project } from './entities/project.entity';
import { ProjectRepository } from './project.repository';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectResponseDto } from './dto/project.response.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectService {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async findProjectById(id: number): Promise<Project> {
    const project = await this.projectRepository.findProjectById(id);
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    return project;
  }

  async create(createProjectDto: CreateProjectDto): Promise<ProjectResponseDto> {
    const project = await this.projectRepository.insertProject(createProjectDto);
    return project.toDto();
  }

  async findAllProjects(): Promise<ProjectResponseDto[]> {
    const projects = await this.projectRepository.findAllProjects();
    return projects.map((project) => project.toDto());
  }

  async findAllProjectsByUserId(userId: number): Promise<ProjectResponseDto[]> {
    const projects = await this.projectRepository.findAllProjectsByUserId(userId);
    return projects.map((project) => project.toDto());
  }

  async updateProject(userId: number, projectId: number, updateProjectDto: UpdateProjectDto): Promise<ProjectResponseDto> {
    const existingProject = await this.projectRepository.findProjectById(projectId);
    if (!existingProject || existingProject.userId !== userId) {
      throw new NotFoundException('Project not found for the specified user');
    }
    const updatedProject = await this.projectRepository.updateProject(existingProject, updateProjectDto);
    return updatedProject.toDto();
  }

  async deleteProject(userId: number, projectId: number): Promise<void> {
    const existingProject = await this.projectRepository.findProjectById(projectId);
    if (!existingProject || existingProject.userId !== userId) {
      throw new NotFoundException('Project not found for the specified user');
    }
    await this.projectRepository.deleteProject(existingProject.id);
  }
}