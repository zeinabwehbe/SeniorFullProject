import { Column, DataType, Model, Table, ForeignKey, BelongsTo, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import { User } from '../../users/entities/user.entity';
import { Skill } from '../../skills/entities/skill.entity';
import { SkillType, SkillLevel } from '../dto/create-user-skill.dto';

@Table({
  tableName: 'User_Skills',
  timestamps: false,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
})
export class UserSkill extends Model<UserSkill> {
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
  user_id: number;

  @ForeignKey(() => Skill)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'skill_id',
  })
  skill_id: number;

  @Column({
    type: DataType.ENUM(...Object.values(SkillType)),
    allowNull: false,
    field: 'skill_type',
  })
  skill_type: SkillType;

  @Column({
    type: DataType.ENUM(...Object.values(SkillLevel)),
    allowNull: false,
    field: 'skill_level',
  })
  skill_level: SkillLevel;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Skill)
  skill: Skill;

  @CreatedAt
  @Column({
    field: 'created_at',
  })
  created_at: string;

  @UpdatedAt
  @Column({
    field: 'updated_at',
  })
  updated_at: string;
} 