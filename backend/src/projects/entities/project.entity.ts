import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../../users/entities/user.entity';
import { ProjectResponseDto } from '../dto/project.response.dto';

@Table({
  tableName: 'Project',
  timestamps: false,
})
export class Project extends Model<Project> {
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
    field: 'title',
  })
  title: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
    field: 'description',
  })
  description: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: 'link',
  })
  link: string;

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

  toDto(): ProjectResponseDto {
    return {
      id: this.id,
      userId: this.userId,
      title: this.title,
      description: this.description,
      link: this.link,
      startDate: this.startDate,
      endDate: this.endDate,
    };
  }
}