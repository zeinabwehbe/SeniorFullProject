import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

import { DatabaseInitService } from './database-init.service';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { User } from 'src/users/entities/user.entity';
import { Review } from 'src/review/entities/review.entity';
import { Category } from 'src/categories/entities/category.entity';
import { UserSkill } from 'src/User_Skill/entitiy/user-skill.entity';
import { Skill } from 'src/skills/entities/skill.entity';
import { Education } from 'src/education/entities/education.entity';
import { Experience } from 'src/experience/entities/experience.entity';
import { Project } from 'src/projects/entities/project.entity';
import { Certification } from 'src/certifications/entities/certification.entity';

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
      useFactory: async (configService: ConfigService) => {
        return {
          dialect: 'mysql',
          host: configService.get('DB_HOST', 'localhost'),
          port: configService.get('DB_PORT', 3306),
          username: configService.get('DB_USER', 'root'),
          password: configService.get('DB_PASS', '@dmin!123@$'),
          database: configService.get('DB_NAME', 'skillUp'),
          models: [
            User, Review, Category, Skill, UserSkill, Education, Experience, Project, Certification
          ],
          synchronize: true, // Set to true temporarily to sync schema
          logging: true,
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [DatabaseInitService],
  exports: [DatabaseInitService, SequelizeModule],
})
export class DatabaseModule {}
