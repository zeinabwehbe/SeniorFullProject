import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';
import { User } from '../../users/entities/user.entity';
import { EducationResponseDto } from '../dto/education.response.dto';

@Table({
  tableName: 'Education',
  timestamps: false, // Change to false since we're handling timestamps manually
  createdAt: 'created_at',
})
export class Education extends Model<Education> {
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
    field: 'institution',
  })
  institution: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: 'degree',
  })
  degree: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: 'field_of_study',
  })
  fieldOfStudy: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    field: 'start_year',
  })
  startYear: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    field: 'end_year',
  })
  endYear: number;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
    field: 'description',
  })
  description: string;


  toDto(): EducationResponseDto {
      return {
          id: this.id,
          userId: this.userId,
          institution: this.institution,
          degree: this.degree,
          fieldOfStudy: this.fieldOfStudy,
          startYear: this.startYear,
          endYear: this.endYear,
          description: this.description,
      };
  }
}