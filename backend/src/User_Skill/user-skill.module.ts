
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserSkillController } from './user-skill.controller';
import { UserSkillService } from './user-skill.service';
import { UserSkillRepository } from './user-skill.repository';
import { UserSkill } from './entitiy/user-skill.entity';
import { User } from '../users/entities/user.entity';
import { Skill } from '../skills/entities/skill.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([UserSkill, User, Skill]),
  ],
  controllers: [UserSkillController],
  providers: [UserSkillService, UserSkillRepository],
  exports: [UserSkillService],
})
export class UserSkillModule {} 



