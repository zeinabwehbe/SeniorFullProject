import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'cv_skills', timestamps: false })
export class CvSkill extends Model<CvSkill> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  userId: number;

  @Column
  skillId: number;

  @Column
  skillName: string;

  @Column
  level: string;
} 