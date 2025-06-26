import { PartialType } from "@nestjs/mapped-types";
import { CreateCvSkillDto } from "./create-cvSkill.dto";

export class UpdateCvSkillDto extends PartialType(CreateCvSkillDto) {
  userId?: number;
}