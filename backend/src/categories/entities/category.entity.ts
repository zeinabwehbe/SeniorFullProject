import { Column, Model, Table, HasMany } from 'sequelize-typescript';
import { Skill } from '../../skills/entities/skill.entity';

@Table({
  tableName: 'categories',
  timestamps: true,
})
export class Category extends Model {
  @Column
  name: string;

  @Column
  description: string;

  @Column
  icon: string;

  @HasMany(() => Skill)
  skills: Skill[];
} 