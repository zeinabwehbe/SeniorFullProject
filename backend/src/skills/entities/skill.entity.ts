import { Column, DataType, ForeignKey, Model, Table, BelongsTo } from 'sequelize-typescript';
import { Category } from 'src/categories/entities/category.entity';

@Table({ tableName: 'Skills' })
export class Skill extends Model<Skill> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
  })
  categoryId: number;

  @BelongsTo(() => Category)
  category: Category;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  skill_name: string;

  @Column(DataType.TEXT)
  description: string;

  @Column({
    type: DataType.STRING,
    defaultValue: 'pending',
  })
  approval_status: string;
}
