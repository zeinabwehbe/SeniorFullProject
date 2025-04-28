import { SkillLevel, SkillType } from './create-user-skill.dto';
import { User } from '../../users/entities/user.entity';
import { Skill } from '../../skills/entities/skill.entity';

export class UserSkillResponseDto {
  id: number;
  user_id: number;
  skill_id: number;
  skill_type: SkillType;
  skill_level: SkillLevel;
  created_at: string;
  updated_at: string;
  user?: Partial<User>;
  skill?: Partial<Skill>;
} 