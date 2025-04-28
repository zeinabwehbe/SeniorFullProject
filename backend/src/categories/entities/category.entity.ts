import { Column, Model, Table, HasMany, DataType } from 'sequelize-typescript';
import { Skill } from '../../skills/entities/skill.entity';

@Table({
  tableName: 'Category',
  timestamps: true,
})
export class Category extends Model<Category> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  profile_pic: string;

  // One-to-many relation: one category has many skills
  @HasMany(() => Skill)
  skills: Skill[];
}
