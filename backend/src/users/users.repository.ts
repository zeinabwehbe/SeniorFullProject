import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op, Transaction } from 'sequelize';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async findUserByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ where: { email } });
  }

  async findAllUsers(): Promise<User[]> {
    return this.userModel.findAll();
  }

  async insertUser(createUserDto: CreateUserDto, transaction?: Transaction): Promise<User> {
    return this.userModel.create(createUserDto, { transaction });
  }

  async findUserById(id: number): Promise<User | null> {
    return await this.userModel.findOne({ where: { id } });

  }

  async updateUser(user: User, editUserDto: UpdateUserDto): Promise<User> {
    return await user.update(editUserDto);
  }

  async findUsersByPhoneOrEmail(phoneNumber?: string, email?: string, excludeid?: number): Promise<User[]> {
    if (!phoneNumber && !email) {
      return [];
    }
    const query = {
      where: {
        [Op.or]: [phoneNumber && { phoneNumber }, email && { email }],
      },
    };

    if (excludeid) {
      query.where['id'] = { [Op.ne]: excludeid };
    }
    return await this.userModel.findAll(query);
  }
}
