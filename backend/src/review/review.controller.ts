// src/users/users.controller.ts
import {
  Controller,
  Post,
  Body,
  Param,
  Put,
  UseGuards,
  Logger,
  Patch,
  Get,
  ParseIntPipe,
  Delete,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { Review, UserRole } from './entities/review.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../roles/roles.guard';
import { Roles } from '../roles/roles.decorator';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewResponseDto } from './dto/review.response.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Controller('reviews')
export class ReviewController {
  private readonly logger = new Logger(ReviewController.name);

  constructor(private readonly reviewService: ReviewService) {}

  // 🔹 Create a new review
  @Post()
  @UseGuards(JwtAuthGuard) // Optional: Require authentication
  async create(@Body() dto: CreateReviewDto): Promise<ReviewResponseDto> {
    const review = await this.reviewService.createReview(dto);
    return review;
  }

  // 🔹 Get all reviews (for guest)
  @Get()
  async findAll(): Promise<ReviewResponseDto[]> {
    const reviews = await this.reviewService.findAll();
    return reviews;
  }

  // 🔹 Get a single review by ID (admin only)
  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ReviewResponseDto> {
    const review = await this.reviewService.findOne(id);
    return review;
  }

  // 🔹 Update a review (admin only or user-owned - depends on future policy)
  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateReviewDto,
  ): Promise<ReviewResponseDto> {
    const review = await this.reviewService.updateReview(id, dto);
    return review;
  }
  // 🔹 Optional: Delete a review
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    await this.reviewService.deleteReview(id);
    return { message: 'Review deleted successfully' };
  }
}
