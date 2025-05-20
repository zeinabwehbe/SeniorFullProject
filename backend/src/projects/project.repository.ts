import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Transaction } from 'sequelize';
import { Project } from './entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectRepository {
  constructor(
    @InjectModel(Project)
    private readonly projectModel: typeof Project,
  ) {}

  async findProjectById(id: number): Promise<Project | null> {
    return await this.projectModel.findOne({ where: { id } });
  }

  async findAllProjects(): Promise<Project[]> {
    return this.projectModel.findAll();
  }

  async findAllProjectsByUserId(userId: number): Promise<Project[]> {
    return this.projectModel.findAll({ where: { userId } });
  }

  async insertProject(
    createProjectDto: CreateProjectDto,
    transaction?: Transaction,
  ): Promise<Project> {
    return this.projectModel.create(createProjectDto, { transaction });
  }

  async updateProject(project: Project, updateProjectDto: UpdateProjectDto): Promise<Project> {
    return await project.update(updateProjectDto);
  }

  async deleteProject(id: number): Promise<void> {
    await this.projectModel.destroy({ where: { id } });
  }
}