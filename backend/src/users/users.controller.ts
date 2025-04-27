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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User, UserRole } from './entities/user.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../roles/roles.guard';
import { Roles } from '../roles/roles.decorator';
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

@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(private usersService: UsersService) {}

  @Post('/register')
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const user = await this.usersService.create(createUserDto);
    return user;
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.USER)
  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.usersService.findAllUsers();
    return users.map((user) => user.toDto());
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.USER)
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserResponseDto> {
    const user = await this.usersService.findUserById(id);
    return user.toDto();
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.USER)
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
}
