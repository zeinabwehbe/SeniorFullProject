import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../../users/entities/user.entity';
import { ExperienceResponseDto } from '../dto/experience.response.dto';

@Table({
  tableName: 'Experience',
  timestamps: false,
})
export class Experience extends Model<Experience> {
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

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'job_title',
  })
  jobTitle: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'company',
  })
  company: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    field: 'start_date',
  })
  startDate: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    field: 'end_date',
  })
  endDate: Date;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
    field: 'description',
  })
  description: string;

  toDto(): ExperienceResponseDto {
    return {
      id: this.id,
      userId: this.userId,
      jobTitle: this.jobTitle,
      company: this.company,
      startDate: this.startDate,
      endDate: this.endDate,
      description: this.description,
    };
  }
}