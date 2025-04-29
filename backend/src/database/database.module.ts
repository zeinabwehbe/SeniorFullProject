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
        const dbPath =
          configService.get<string>('SQLITE_DB_FILE') || '.db/database.sqlite3';
        return {
          dialect: 'sqlite',
          storage: dbPath,
          models: [
            User, Review, Category, Skill, UserSkill, Education
          ],
          synchronize: false,

          logging: false, // Enable logging for troubleshooting
          retryAttempts: 5, // Increase retry attempts
          retryDelay: 3000, // Set delay between retries (in ms)
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [DatabaseInitService],
  exports: [DatabaseInitService, SequelizeModule],
})
export class DatabaseModule {}
