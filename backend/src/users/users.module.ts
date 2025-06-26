import { HttpModule } from '@nestjs/axios';
import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { AuthModule } from '../auth/auth.module';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';
import { EducationModule } from '../education/education.module'; // Ensure EducationModule is imported
import { ExperienceModule } from '../experience/experience.module';
import { ProjectModule } from '../projects/project.module';
import { CertificationModule } from '../certifications/certification.module';
import { UserSkillModule } from '../User_Skill/user-skill.module';
import { CvSkillModule } from 'src/CvSkill/cvSkill.module';

/**
 * The UserModule is a module that handles all operations related to the user entity.
 * It imports necessary modules, declares controllers, and provides services.
 */
@Module({
  imports: [
    forwardRef(() => AuthModule),
    HttpModule,
    SequelizeModule.forFeature([User]),
    EducationModule,
    ExperienceModule,
    ProjectModule,
    CertificationModule,
    UserSkillModule,
    CvSkillModule
  ],
  controllers: [UsersController],
  providers: [UsersRepository, UsersService],
  exports: [UsersService, UsersRepository],
})
export class UsersModule {}
