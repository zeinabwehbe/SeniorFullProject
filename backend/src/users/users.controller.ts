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
import { diskStorage } from 'multer';
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

@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(
    private usersService: UsersService,
    private educationService: EducationService, // Inject EducationService
    private experienceService: ExperienceService,
  ) {}

  @Post('/register')
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const user = await this.usersService.create(createUserDto);
    return user;
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
    // Send the file
    return res.sendFile(join(process.cwd(), user.profilePic));
  }
  @Post(':id/profile-picture')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads', // or your preferred directory
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + extname(file.originalname));
        },
      }),
    }),
  )
  async uploadProfilePicture(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<UserResponseDto> {
    // file.path will now be set
    const user = await this.usersService.addProfilePicture(id, file);
    return user.toDto();
  }

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
}
