

import { SkillLevel } from './create-user-skill.dto';
import { User } from '../../users/entities/user.entity';
import { Skill } from '../../skills/entities/skill.entity';
import { ApprovalStatus } from './create-user-skill.dto';

export class UserSkillResponseDto {
  id: number;
  user_id: number;
  skill_id: number;
  
  skill_level: SkillLevel;
  approval_status: ApprovalStatus;
  created_at: string;
  updated_at: string;
  user?: Partial<User>;
  skill?: Partial<Skill>;
} 
