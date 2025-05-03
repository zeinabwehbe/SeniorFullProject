import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Experience } from './entities/experience.entity';
import { ExperienceController } from './experience.controller';
import { ExperienceRepository } from './experience.repository';
import { ExperienceService } from './experience.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Experience]),
  ],
  controllers: [ExperienceController],
  providers: [ExperienceRepository, ExperienceService],
  exports: [ExperienceService, ExperienceRepository],
})
export class ExperienceModule {}