import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CvController } from '../cv/cv.controller';
import { CvService } from '../cv/cv.service';
import { CvSkill } from './entities/cv-skill.entity';
import { CvSkillService } from './cvSkill.service';
import { CvSkillController } from './cvSkill.controller';
import { CvSkillRepository } from './cvSkill.repository';

@Module({
  imports: [
    SequelizeModule.forFeature([CvSkill]),
  ],
  controllers: [CvSkillController],
  providers: [CvSkillService, CvSkillRepository],
  exports: [CvSkillService],
})
export class CvSkillModule {} 