import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './entities/user.entity';
import * as bcrypt from 'bcryptjs'; // Use bcryptjs instead
import { UsersRepository } from './users.repository';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/user.response.dto';
import { UpdateUserDto } from './dto/update-user.dto';


@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}


  async findUserById(id: number): Promise<User> {
    return this.usersRepository.findUserById(id); // Update to use the repository
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
 
}