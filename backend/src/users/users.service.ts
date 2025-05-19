import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/user.response.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Express } from 'express';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findUserById(id: number): Promise<User> {
    return this.usersRepository.findUserById(id); // Update to use the repository
  }

  async findPublicProfile(id: number) {
    return this.usersRepository.findOne({
      where: { id },
      select: [
        'id', 'name', 'email', 'bio', 'profilePic', 
        'phone', 'linkedinUrl', 'githubUrl', 'portfolioUrl',
        'address'
      ]
    });
  }
  async create(user: CreateUserDto): Promise<UserResponseDto> {
    const { email } = user;
    const existingUser = await this.findUserByEmail(email);
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }
    return this.usersRepository.insertUser(user); // Update to use the repository
  }

  async findAllUsers(): Promise<User[]> {
    return this.usersRepository.findAllUsers(); // Update to use the repository
  }

  async updateUser(id: number, user: UpdateUserDto): Promise<User | undefined> {
    const existingUser = await this.findUserById(id);
    if (!existingUser) {
      throw new NotFoundException('User not found');
    }
    return this.usersRepository.updateUser(existingUser, user); // Update to use the repository
  }

  async findUserByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findUserByEmail(email); // Update to use the repository
  }
  async addProfilePicture(
    id: number,
    file: Express.Multer.File,
  ): Promise<User> {
    const user = await this.usersRepository.findUserById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    user.profilePic = file.path;
    await this.usersRepository.updateUser(user, { profilePic: file.path });
    return user;
  }
}
