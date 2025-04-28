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

  async login(email: string, password: string) {
    const user = await this.usersService.findUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException({
        message: 'Invalid credentials: user not available',
        error: 'Unauthorized',
        statusCode: 401,
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException({
        message: 'Invalid credentials: wrong password',
        error: 'Unauthorized',
        statusCode: 401,
      });
    }

    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        user_id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  }
}
