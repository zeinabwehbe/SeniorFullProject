import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Project } from './entities/project.entity';
import { ProjectController } from './project.controller';
import { ProjectRepository } from './project.repository';
import { ProjectService } from './project.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Project]),
  ],
  controllers: [ProjectController],
  providers: [ProjectRepository, ProjectService],
  exports: [ProjectService, ProjectRepository],
})
export class ProjectModule {}