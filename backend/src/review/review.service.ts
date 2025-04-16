import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review, UserRole } from './entities/review.entity';
import * as bcrypt from 'bcryptjs'; // Use bcryptjs instead
import { ReviewRepository } from './review.repository';
import { InjectModel } from '@nestjs/sequelize';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewResponseDto } from './dto/review.response.dto';
import { UpdateReviewDto } from './dto/update-review.dto';


@Injectable()
export class ReviewService {
  constructor(private readonly reviewRepository: ReviewRepository) {}

 

// 🔹 Create a new review
async createReview(dto: CreateReviewDto): Promise<ReviewResponseDto> {
  const review = await this.reviewRepository.createReview(dto);
  return review.toDto();
}

    // ✅ Get all reviews
    async findAll(): Promise<Review[]> {
      const reviews = await this.reviewRepository.findAllReview();
      return reviews;
    }

// 🔹 Get one review by ID
async findOne(id: number): Promise<ReviewResponseDto> {
  const review = await this.reviewRepository.findReviewById(id);
  return review.toDto();
}

 // 🔹 Update a review
 async updateReview(id: number, dto: UpdateReviewDto): Promise<ReviewResponseDto> {
  const updated = await this.reviewRepository.updateReview(id, dto);
  if (!updated) {
    throw new NotFoundException(`Review with ID ${id} not found`);
  }
  return updated.toDto();
}

async deleteReview(id: number): Promise<void> {
  const review = await this.reviewRepository.findReviewById(id);
  if (!review) {
    throw new NotFoundException('Review not found');
  }
  await this.reviewRepository.deleteReview(id);
}

 

  
 
}