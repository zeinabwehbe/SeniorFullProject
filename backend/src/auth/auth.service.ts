import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { compare } from 'bcryptjs';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    if (user && await user.validatePassword(password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(username: string, password: string) {
    const user = await this.usersService.findByUsername(username);
    if (!user) {
      throw new UnauthorizedException({
        message: 'Invalid credentials: user not available',
        error: 'Unauthorized',
        statusCode: 401,
      });
    }

    //const isPasswordValid = await compare(password, user.password);
    const isPasswordValid = user.password === password; // Changed to simple equality check

    if (!isPasswordValid) {
      throw new UnauthorizedException({
        message: 'Invalid credentials: wrong password',
        error: 'Unauthorized',
        statusCode: 401,
      });
    }
    
    const payload = { username: user.username, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
    };
  }
}
