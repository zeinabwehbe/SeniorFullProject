/**
 * Response Data Transfer Object for skill data
 */
import { Category } from "src/categories/entities/category.entity";
import { ApprovalStatus } from "../entities/skill.entity";

export class SkillResponseDto {
  id: number;
  skill_name: string;
  category_id: number;
  description: string  ;
  approval_status: ApprovalStatus;
  createdAt: string;
  updatedAt: string;
  category?: Category;
} 