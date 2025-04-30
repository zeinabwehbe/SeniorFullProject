import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Education } from './entities/education.entity';
import { EducationController } from './education.controller';
import { EducationRepository } from './education.repository';
import { EducationService } from './education.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Education]),
  ],
  controllers: [EducationController],
  providers: [EducationRepository, EducationService],
  exports: [EducationService, EducationRepository],
})
export class EducationModule {}