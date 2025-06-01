import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op, Transaction } from 'sequelize';
import { Review } from './entities/review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ReviewRepository {
  constructor(
    @InjectModel(Review)
    private readonly reviewModel: typeof Review,
  ) {}

  async findAllReview(): Promise<Review[]> {
    return this.reviewModel.findAll({
      include: [
        {
          model: User,
          attributes: ['id', 'name', 'bio', 'profilePic'],
        },
      ],
    });
  }

  async createReview(
    createReviewDto: CreateReviewDto,
    transaction?: Transaction,
  ): Promise<Review> {
    return this.reviewModel.create(createReviewDto, { transaction });
  }

  async findReviewById(id: number): Promise<Review> {
    return this.reviewModel.findByPk(id, { include: ['user'] });
  }

  async updateReview(id: number, dto: UpdateReviewDto): Promise<Review> {
    const review = await this.findById(id);
    if (review) {
      return review.update(dto);
    }
    return null;
  }

  async deleteReview(id: number): Promise<void> {
    const review = await this.findReviewById(id);
    await review.destroy();
  }

  async findById(id: number): Promise<Review> {
    return this.reviewModel.findByPk(id, { include: ['user'] });
  }
}
