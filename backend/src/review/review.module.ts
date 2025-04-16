import { HttpModule } from '@nestjs/axios';
import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { AuthModule } from 'src/auth/auth.module';
import { Review } from './entities/review.entity';
import { ReviewController } from './review.controller';
import { ReviewRepository } from './review.repository';
import { ReviewService } from './review.service';


/**
 * The UserModule is a module that handles all operations related to the user entity.
 * It imports necessary modules, declares controllers, and provides services.
 */
@Module({
  imports: [
    forwardRef(() => AuthModule),
    HttpModule,
    SequelizeModule.forFeature([Review]),
  ],
  controllers: [ReviewController],
  providers: [ReviewService, ReviewRepository],
  exports: [ReviewService],
})
export class ReviewModule {}
