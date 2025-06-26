import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

import { DatabaseInitService } from './database-init.service';
import { User } from '../users/entities/user.entity';
import { Review } from '../review/entities/review.entity';
import { Category } from '../categories/entities/category.entity';
import { UserSkill } from '../User_Skill/entitiy/user-skill.entity';
import { Skill } from '../skills/entities/skill.entity';
import { Education } from '../education/entities/education.entity';
import { Experience } from '../experience/entities/experience.entity';
import { Project } from '../projects/entities/project.entity';
import { Certification } from '../certifications/entities/certification.entity';
import { CvSkill } from 'src/CvSkill/entities/cv-skill.entity';

/**
 * The DatabaseModule is responsible for configuring and initializing the database.
 * It sets up the connection to the database using Sequelize and provides necessary services.
 */
@Module({
  imports: [
    // Import the ConfigModule to enable environment variable configuration
    ConfigModule.forRoot(),
    // Configure SequelizeModule asynchronously
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        dialect: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: parseInt(configService.get<string>('DB_PORT', '3306')),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASS'),
        database: configService.get<string>('DB_NAME'),
        models: [
          User, Review, Category, Skill, UserSkill, Education, Experience, Project, Certification, CvSkill
        ],
        autoLoadModels: true,
        synchronize: true, // Set to false in production!
        logging: false,
        retryAttempts: 5,
        retryDelay: 3000,
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [DatabaseInitService],
  exports: [DatabaseInitService, SequelizeModule],
})
export class DatabaseModule {}
