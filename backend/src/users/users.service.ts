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

  async findByUsername(username: string) {
    return this.usersRepository.findByUsername(username);
  }


  async findById(id: number): Promise<User | undefined> {
    return this.usersRepository.findById(id); // Update to use the repository
  }

  async create(user: CreateUserDto): Promise<UserResponseDto> {
    const {username} = user;
console.error(username)
    const existingUser = await this.findByUsername(username);
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }
    return this.usersRepository.insertUser(user); // Update to use the repository
  }

  async getAllUsers(): Promise<User[]> {
    return this.usersRepository.find(); // Update to use the repository
  }

 
  async updateUser(id: number, user: UpdateUserDto): Promise<User | undefined> {
    const existingUser = await this.findById(id);
    if (!existingUser) {
      throw new NotFoundException('User not found');
    }
    return this.usersRepository.updateUser(existingUser, user); // Update to use the repository
  }
 
}