import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';
import { UserResponseDto } from '../dto/user.response.dto';
import { BeforeInsert } from 'typeorm';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
  MODERATOR = 'moderator', // {{ edit_1 }} Adding new role
}

@Table({ tableName: 'users', timestamps: false })
export class User extends Model<User> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  username: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({ 
    type: DataType.ENUM(...Object.values(UserRole)),
    defaultValue: UserRole.USER 
  })
  role: UserRole;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

    // convert the model into a UserDto
    toDto(): UserResponseDto {
      return {
        id: this.id,
        username: this.username,
        role: this.role      
      };
    }
}