import { Inject, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { MailService } from 'src/mail/mail.service';
import { UsersRepository } from 'src/users/users.repository';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
        private mailService: MailService,
        private userRepository: UsersRepository,

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

    const payload = { sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async requestPasswordReset(email: string): Promise<{ message: string }> {
    // Check if user exists
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      // Don't reveal if email exists or not for security
      return { message: 'If the email exists, a temporary password has been sent.' };
    }

    // Generate temporary password
    const temporaryPassword = this.mailService.generateTemporaryPassword();
    
    // Hash the temporary password
    const saltRounds = 10;
    const hashedTempPassword = await bcrypt.hash(temporaryPassword, saltRounds);
    
    // Update user's password to the temporary one
    await this.userRepository.updateUser(user, { 
      password: hashedTempPassword,
      // Optional: Add a flag to force password change on next login
      mustChangePassword: true,

    });

    // Send email with temporary password
    await this.mailService.sendTemporaryPasswordEmail(email, temporaryPassword);

    return { message: 'If the email exists, a temporary password has been sent.' };
  }
  async changePassword(email: string, oldPassword: string, newPassword: string): Promise<{ message: string }> {
    const user = await this.userRepository.findOne({ where: { email } });
  
    if (!user) {
      throw new Error('User not found');
    }
  
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      throw new Error('Old password is incorrect');
    }
  
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
  
    await this.userRepository.updateUser(user, { 
      password: hashedPassword,
      mustChangePassword: false,
    });
  
    return { message: 'Password changed successfully' };
  }

  // Optional: Clean up old temporary passwords (run as cron job)
  async cleanupExpiredTempPasswords(): Promise<void> {
    const oneDayAgo = new Date();
    oneDayAgo.setDate(oneDayAgo.getDate() - 1);

    // Find users with temp passwords older than 1 day
    const usersWithExpiredTempPasswords = await this.userRepository.findOne({
      where: {
        mustChangePassword: true,
        tempPasswordSetAt: { $lt: oneDayAgo } as any
      }
    });

    // Optionally disable these accounts or send reminder emails
    console.log(`Found ${usersWithExpiredTempPasswords} accounts with expired temporary passwords`);
  }

}
