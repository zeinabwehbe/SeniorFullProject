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

  async findByUsername(username: string): Promise<User | undefined> {
    return this.userModel.findOne({ where: { username } });
  }

  async findById(id: number): Promise<User | undefined> {
    return this.userModel.findOne({ where: { id } });
  }

  async find(): Promise<User[]> {
    return this.userModel.findAll();
  }

  async insertUser(createUserDto: CreateUserDto, transaction?: Transaction): Promise<User> {
    return this.userModel.create(createUserDto, { transaction });
  }

  async getUserById(id: number, isCheckIfEnabled = false): Promise<User | null> {
    const whereClause = {
      id,
      ...(isCheckIfEnabled && { isEnabled: true }),
    };

    return this.userModel.findOne({
      where: whereClause,
    });
  }

  async updateUser(user: User, editUserDto: UpdateUserDto): Promise<User> {
    return await user.update(editUserDto);
  }

  async getUsersByPhoneOrEmail(phoneNumber?: string, email?: string, excludeUserId?: number): Promise<User[]> {
    if (!phoneNumber && !email) {
      return [];
    }

    const query = {
      where: {
        [Op.or]: [phoneNumber && { phoneNumber }, email && { email }],
      },
    };

    if (excludeUserId) {
      query.where['id'] = { [Op.ne]: excludeUserId };
    }

    return await this.userModel.findAll(query);
  }
}
