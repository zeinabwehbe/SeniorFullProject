import * as path from 'path';

import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';
import { AcceptLanguageResolver, I18nModule } from 'nestjs-i18n';
import { MailerModule } from '@nestjs-modules/mailer'; // Import MailerModule

import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import configuration from './configuration';
import { getEnvPath } from './env.helper';
import { UsersModule } from './users/users.module';
import { ReviewModule } from './review/review.module';
import { CategoryModule } from './categories/category.module';
import { SkillsModule } from './skills/skills.module';
import { UserSkillModule } from './User_Skill/user-skill.module';
import { EducationModule } from './education/education.module';
import { ExperienceModule } from './experience/experience.module';
import { ProjectModule } from './projects/project.module';
import { CertificationModule } from './certifications/certification.module';
import { CvModule } from './cv/cv.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ChatbotModule } from './chatbot/chatbot.module';
import { MailModule } from './mail/mail.module';
import { CvSkillModule } from './CvSkill/cvSkill.module';

const envFilePath: string = getEnvPath(`.`);

/**
 * The AppModule is the root module of the application.
 * It imports and configures necessary modules, global services, and filters for the application.
 * It serves as the entry point for the NestJS application and sets up the overall application configuration.
 */
@Module({
  imports: [
    // ConfigModule handles the loading and management of configuration settings.
    // It reads the environment variables from the `.env` file and makes the configuration globally available.
    ConfigModule.forRoot({
      envFilePath: envFilePath, // Path to the environment configuration file.
      load: [configuration], // Load the configuration object.
      isGlobal: true, // Make the configuration globally available.
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'frontend'),
      serveStaticOptions: {
        index: 'homepage.html', // Serve homepage.html as the default instead of index.html
      },
    }),
    // I18nModule handles internationalization and localization.
    // It allows the application to support multiple languages and provides the mechanism to load translations.
    // I18nModule.forRoot({
    //   fallbackLanguage: 'en', // Default language if a specific translation is not available.
    //   loaderOptions: {
    //     path: path.join(__dirname, '/i18n/'), // Path to the translation files.
    //     watch: true, // Watch for changes in translation files and reload them.
    //   },
    //   resolvers: [{ use: AcceptLanguageResolver, options: ['lang', 'locale', 'l'] }],
    // }),
    // JWT Import
    PassportModule.register({ defaultStrategy: 'jwt' }),
    // SharedModule contains shared services, utilities, and modules that are used across the application.
    // DatabaseModule manages the database connection and initialization.
    // It is responsible for setting up the database configuration and providing necessary database services.
    DatabaseModule,
    // CompanyModule handles all operations related to the company entity.
    // It includes controllers, services, and models related to the company.
    AuthModule,
    UsersModule,
    ReviewModule,
    CategoryModule,
    SkillsModule,
    UserSkillModule,
    EducationModule,
    ExperienceModule,
    ProjectModule,
    CertificationModule,
    CvModule,
    ChatbotModule,
    MailModule,
    CvSkillModule
  ],
  providers: [
    // Logger is used to log messages, errors, and other information throughout the application.
    Logger,
  ],
})
export class AppModule {}
