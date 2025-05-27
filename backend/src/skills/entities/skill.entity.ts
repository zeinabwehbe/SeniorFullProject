

import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
  BelongsTo, CreatedAt, UpdatedAt,
} from 'sequelize-typescript';
import { Category } from 'src/categories/entities/category.entity';



@Table({ 
  tableName: 'Skills',
  timestamps: false,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
})
export class Skill extends Model<Skill> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  skill_name: string;

  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
    field: 'categoryId',
    allowNull: true
  })
  category_id: number;

  @BelongsTo(() => Category, {
    foreignKey: 'categoryId'
  })
  category: Category;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description: string;

 
  @CreatedAt
  @Column({
    field: 'created_at',
  })
  createdAt: string;

  @UpdatedAt
  @Column({
    field: 'updated_at',
  })
  updatedAt: string;
}




