import { Column, Model, Table, DataType, HasMany, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import { Skill } from '../../skills/entities/skill.entity';

/**
 * Category entity representing the Category table in the database
 */
@Table({
  tableName: 'Category',
  timestamps: false,
  createdAt: 'created_at'
})
export class Category extends Model<Category> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'id',
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    field: 'name',
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'profile_pic',
  })
  profilePic: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
    field: 'description',
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
  
  /**
   * Relationship with Skills
   */
  @HasMany(() => Skill, 'categoryId')
  skills: Skill[];
}
