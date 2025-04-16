import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  CreatedAt,
  BelongsTo,
  UpdatedAt,
} from 'sequelize-typescript';
import { User } from 'src/users/entities/user.entity';
import { ReviewResponseDto } from '../dto/review.response.dto';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

@Table({
  tableName: 'Review',
  timestamps: false, // Disable automatic timestamps
})
export class Review extends Model<Review> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    field: 'id',
  })
  id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'user_id',  
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    validate: {
      min: 1,
      max: 5,
    },
  })
  rating: number;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  comment: string;

  @CreatedAt
  @Column({
    type: DataType.DATE,
    field: 'created_at',
  })
  createdAt: string;

  toDto(): ReviewResponseDto {
    return {
      id: this.id,
      userId: this.userId,
      rating: this.rating,
      comment: this.comment,
      createdAt: this.createdAt,
      userName: this.user ? this.user.name : `User ${this.userId}`,
      userTitle: this.user ? this.user.bio || 'SkillSwap User' : 'SkillSwap User',
    };
  }
}