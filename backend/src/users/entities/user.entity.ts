import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
  CreatedAt,
  BeforeCreate,
  UpdatedAt,
} from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';
import { UserResponseDto } from '../dto/user.response.dto';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}
// other than this, it is a guest

@Table({
  tableName: 'Users',
  timestamps: false, // Change to false since we're handling timestamps manually
  createdAt: 'created_at',
})
export class User extends Model<User> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    field: 'id',
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'name',
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.ENUM(...Object.values(UserRole)),
    defaultValue: UserRole.USER,
    allowNull: false,
  })
  role: UserRole;

  @CreatedAt
  @Column({
    field: 'created_at',
    defaultValue: DataType.NOW,
  })
  createdAt: Date;

  @UpdatedAt
  @Column({
    field: 'updated_at',
  })
  updatedAt: Date;

  @Column({
    type: DataType.STRING,
    defaultValue: 'active',
    field: 'status',
  })
  status: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: 'profile_pic',
  })
  profilePic: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  phone: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  address: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  bio: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: 'linkedin_url',
  })
  linkedinUrl: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: 'github_url',
  })
  githubUrl: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: 'portfolio_url',
  })
  portfolioUrl: string;

  @BeforeCreate
  static async hashPassword(instance: User) {
    if (instance.password) {
      instance.password = await bcrypt.hash(instance.password, 10);
    }
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  toDto(): UserResponseDto {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      bio: this.bio,
      profilePic: this.profilePic,
      role: this.role,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      status: this.status,
      phone: this.phone,
      address: this.address,
      linkedinUrl: this.linkedinUrl,
      githubUrl: this.githubUrl,
      portfolioUrl: this.portfolioUrl,
    };
  }
}
