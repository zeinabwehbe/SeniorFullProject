// src/users/users.controller.ts
import {
  Controller,
  Post,
  Body,
  Param,
  UseGuards,
  Logger,
  Patch,
  Get,
  ParseIntPipe,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../roles/roles.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/user.response.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
// import { diskStorage } from 'multer';
import { extname } from 'path';
import { Res } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';
import { EducationService } from '../education/education.service';
import { CreateEducationDto } from '../education/dto/create-education.dto';
import { UpdateEducationDto } from '../education/dto/update-education.dto';
import { EducationResponseDto } from '../education/dto/education.response.dto';
import { ExperienceService } from '../experience/experience.service';
import { CreateExperienceDto } from '../experience/dto/create-experience.dto';
import { UpdateExperienceDto } from '../experience/dto/update-experience.dto';
import { ExperienceResponseDto } from '../experience/dto/experience.response.dto';
import { ProjectService } from '../projects/project.service';
import { CreateProjectDto } from '../projects/dto/create-project.dto';
import { UpdateProjectDto } from '../projects/dto/update-project.dto';
import { ProjectResponseDto } from '../projects/dto/project.response.dto';
import { CertificationService } from '../certifications/certification.service';
import { CreateCertificationDto } from '../certifications/dto/create-certification.dto';
import { UpdateCertificationDto } from '../certifications/dto/update-certification.dto';
import { CertificationResponseDto } from '../certifications/dto/certification.response.dto';
import { UserSkillService } from '../User_Skill/user-skill.service';
import { UserSkillResponseDto } from '../User_Skill/dto/user-skill.response';
import { CreateUserSkillDto } from '../User_Skill/dto/create-user-skill.dto';
import { UpdateUserSkillDto } from '../User_Skill/dto/update-user-skill.dto';

@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  // First, add ProjectService to the imports and constructor
  constructor(
    private usersService: UsersService,
    private educationService: EducationService,
    private experienceService: ExperienceService,
    private projectService: ProjectService,
    private certificationService: CertificationService,
    private userSkillService: UserSkillService,
  ) {}

  @Post('/register')
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const user = await this.usersService.create(createUserDto);
    return user;
  }
  @Get('public')
  
  async findAllUser(): Promise<UserResponseDto[]> {
    const users = await this.usersService.findAllUsers();
    return users.map((user) => user.toDto());
  }
  
  @Get('public/:id')
  async findPublic(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserResponseDto> {
    const user = await this.usersService.findPublicProfile(id);
    return user.toDto();
  }
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.usersService.findAllUsers();
    return users.map((user) => user.toDto());
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserResponseDto> {
    const user = await this.usersService.findUserById(id);
    return user.toDto();
  }
  

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateRole(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const user = await this.usersService.updateUser(id, updateUserDto);
    return user.toDto();
  }

  @Get(':id/profile-picture')
  async getProfilePicture(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ) {
    const user = await this.usersService.findUserById(id);
    if (!user || !user.profilePic) {
      return res.status(404).send('Profile picture not found');
    }
  
    if (user.profilePic.startsWith('http://') || user.profilePic.startsWith('https://')) {
      return res.redirect(user.profilePic);
    }
  
    return res.sendFile(join(process.cwd(), user.profilePic));
  }
  
  // @Post(':id/profile-picture')
  // @UseGuards(JwtAuthGuard)
  // @UseInterceptors(
  //   FileInterceptor('file', {
  //     storage: diskStorage({
  //       destination: './uploads', // or your preferred directory
  //       filename: (req, file, cb) => {
  //         const uniqueSuffix =
  //           Date.now() + '-' + Math.round(Math.random() * 1e9);
  //         cb(null, uniqueSuffix + extname(file.originalname));
  //       },
  //     }),
  //   }),
  // )
  // async uploadProfilePicture(
  //   @Param('id', ParseIntPipe) id: number,
  //   @UploadedFile() file: Express.Multer.File,
  // ): Promise<UserResponseDto> {
  //   // file.path will now be set
  //   const user = await this.usersService.addProfilePicture(id, file);
  //   return user.toDto();
  // }

  @Get(':userId/education')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getUserEducation(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<EducationResponseDto[]> {
    const educationRecords = await this.educationService.findAllEducationByUserId(userId);
    return educationRecords.map((education) => education );
  }

  @Post(':userId/education')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async addEducation(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() createEducationDto: CreateEducationDto,
  ): Promise<EducationResponseDto> {
    createEducationDto.userId = userId; // Ensure the userId is set
    const education = await this.educationService.create(createEducationDto);
    return education ;
  }

  @Patch(':userId/education/:educationId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateEducation(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('educationId', ParseIntPipe) educationId: number,
    @Body() updateEducationDto: UpdateEducationDto,
  ): Promise<EducationResponseDto> {
    const education = await this.educationService.updateEducation(userId, educationId, updateEducationDto);
    return education ;
  }

  @Delete(':userId/education/:educationId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async deleteEducation(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('educationId', ParseIntPipe) educationId: number,
  ): Promise<void> {
    await this.educationService.deleteEducation(userId, educationId);
  }

  @Get(':userId/experience')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getUserExperience(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<ExperienceResponseDto[]> {
    const experienceRecords = await this.experienceService.findAllExperienceByUserId(userId);
    return experienceRecords;
  }

  @Post(':userId/experience')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async addExperience(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() createExperienceDto: CreateExperienceDto,
  ): Promise<ExperienceResponseDto> {
    createExperienceDto.userId = userId;
    const experience = await this.experienceService.create(createExperienceDto);
    return experience;
  }

  @Patch(':userId/experience/:experienceId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateExperience(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('experienceId', ParseIntPipe) experienceId: number,
    @Body() updateExperienceDto: UpdateExperienceDto,
  ): Promise<ExperienceResponseDto> {
    return this.experienceService.updateExperience(userId, experienceId, updateExperienceDto);
  }

  @Delete(':userId/experience/:experienceId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async deleteExperience(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('experienceId', ParseIntPipe) experienceId: number,
  ): Promise<void> {
     await this.experienceService.deleteExperience(userId, experienceId);
  }

  @Get(':userId/projects')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getUserProjects(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<ProjectResponseDto[]> {
    const projectRecords = await this.projectService.findAllProjectsByUserId(userId);
    return projectRecords;
  }

  @Post(':userId/projects')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async addProject(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() createProjectDto: CreateProjectDto,
  ): Promise<ProjectResponseDto> {
    createProjectDto.userId = userId;
    const project = await this.projectService.create(createProjectDto);
    return project;
  }

  @Patch(':userId/projects/:projectId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateProject(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('projectId', ParseIntPipe) projectId: number,
    @Body() updateProjectDto: UpdateProjectDto,
  ): Promise<ProjectResponseDto> {
    return this.projectService.updateProject(userId, projectId, updateProjectDto);
  }

  @Delete(':userId/projects/:projectId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async deleteProject(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('projectId', ParseIntPipe) projectId: number,
  ): Promise<void> {
    await this.projectService.deleteProject(userId, projectId);
  }
  @Get(':userId/certifications')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getUserCertifications(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<CertificationResponseDto[]> {
    const certificationRecords = await this.certificationService.findAllCertificationsByUserId(userId);
    return certificationRecords;
  }

  @Post(':userId/certifications')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async addCertification(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() createCertificationDto: CreateCertificationDto,
  ): Promise<CertificationResponseDto> {
    createCertificationDto.userId = userId;
    const certification = await this.certificationService.create(createCertificationDto);
    return certification;
  }

  @Patch(':userId/certifications/:certificationId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateCertification(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('certificationId', ParseIntPipe) certificationId: number,
    @Body() updateCertificationDto: UpdateCertificationDto,
  ): Promise<CertificationResponseDto> {
    return this.certificationService.updateCertification(userId, certificationId, updateCertificationDto);
  }

  @Delete(':userId/certifications/:certificationId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async deleteCertification(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('certificationId', ParseIntPipe) certificationId: number,
  ): Promise<void> {
    await this.certificationService.deleteCertification(userId, certificationId);
  }
  
  @Get(':userId/skills')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getUserSkills(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<UserSkillResponseDto[]> {
    const skillRecords = await this.userSkillService.findByUserId(userId);
    return skillRecords;
  }

  @Post(':userId/skills')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async addSkill(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() createSkillDto: CreateUserSkillDto,
  ): Promise<UserSkillResponseDto> {
    createSkillDto.user_id = userId;
    const skill = await this.userSkillService.create(createSkillDto);
    return skill;
  }

  @Patch(':userId/skills/:skillId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateSkill(
    @Param('skillId', ParseIntPipe) skillId: number,
    @Body() updateSkillDto: UpdateUserSkillDto,
  ): Promise<UserSkillResponseDto> {
    const updatedSkill = await this.userSkillService.update(skillId, updateSkillDto);
    return updatedSkill;
  }

  @Delete(':userId/skills/:skillId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async deleteSkill(
    @Param('skillId', ParseIntPipe) skillId: number,
  ): Promise<void> {
    await this.userSkillService.remove(skillId);
  }
}
