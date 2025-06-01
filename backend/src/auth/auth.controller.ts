// src/auth/auth.controller.ts
import { Controller, Post, Body, HttpCode, HttpStatus, HttpException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ChangePasswordDto } from './dto/reset-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    try {
      const result = await this.authService.login(loginDto.email, loginDto.password);
      return result;
    } catch (error) {
      throw new HttpException(
        error.message || 'Login failed',
        error.status || HttpStatus.UNAUTHORIZED
      );
    }
  }
  
  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    try {
      const result = await this.authService.requestPasswordReset(forgotPasswordDto.email);
      return {
        message: result.message,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to process password reset request',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Post('change-password')
  async changePassword(@Body() changePasswordDto: ChangePasswordDto) {
    try {
      const { email, oldPassword, newPassword } = changePasswordDto;
      const result = await this.authService.changePassword(email, oldPassword, newPassword);
      return {
        message: result.message,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to change password',
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
  
}
