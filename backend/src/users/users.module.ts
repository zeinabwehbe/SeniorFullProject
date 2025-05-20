import { HttpModule } from '@nestjs/axios';
import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { AuthModule } from 'src/auth/auth.module';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';
import { EducationModule } from '../education/education.module'; // Ensure EducationModule is imported
import { ExperienceModule } from 'src/experience/experience.module';
import { ProjectModule } from 'src/projects/project.module';
import { CertificationModule } from 'src/certifications/certification.module';
import { UserSkillModule } from 'src/User_Skill/user-skill.module';

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
    UserSkillModule
  ],
  controllers: [UsersController],
  providers: [UsersRepository, UsersService],
  exports: [UsersService, UsersRepository],
})
export class UsersModule {}
