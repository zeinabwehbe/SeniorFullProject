import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../../users/entities/user.entity';
import { CertificationResponseDto } from '../dto/certification.response.dto';

@Table({
  tableName: 'Certification',
  timestamps: false,
})
export class Certification extends Model<Certification> {
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
    field: 'name',
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: 'authority',
  })
  authority: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: 'license_number',
  })
  licenseNumber: string;

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

  toDto(): CertificationResponseDto {
    return {
      id: this.id,
      userId: this.userId,
      name: this.name,
      authority: this.authority,
      licenseNumber: this.licenseNumber,
      startDate: this.startDate,
      endDate: this.endDate,
      description: this.description,
    };
  }
}