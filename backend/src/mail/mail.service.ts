import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get('EMAIL_HOST'),
      port: parseInt(this.configService.get('EMAIL_PORT')),
      secure: this.configService.get('EMAIL_SECURE') === 'true',
      auth: {
        user: this.configService.get('EMAIL_USER'),
        pass: this.configService.get('EMAIL_PASSWORD'),
      },
    });
  }

  generateTemporaryPassword(): string {
      // Generate 8-character alphanumeric password
      return crypto.randomUUID().replace(/-/g, '').slice(0, 8);
  }

  async sendPasswordResetEmail(email: string, token: string): Promise<void> {
    const resetUrl = `http://localhost:3000/reset-password?token=${token}`;    
    const mailOptions = {
      from: this.configService.get('EMAIL_FROM'),
      to: email,
      subject: 'Password Reset Request',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Password Reset Request</h2>
          <p>You have requested to reset your password. Click the link below to reset your password:</p>
          <div style="margin: 20px 0;">
            <a href="${resetUrl}" 
               style="background-color: #007bff; color: white; padding: 12px 24px; 
                      text-decoration: none; border-radius: 4px; display: inline-block;">
              Reset Password
            </a>
          </div>
          <p>This link will expire in 1 hour.</p>
          <p>If you did not request this password reset, please ignore this email.</p>
        </div>
      `,
    };

    await this.transporter.sendMail(mailOptions);
}

async sendTemporaryPasswordEmail(email: string, temporaryPassword: string): Promise<void> {
    const loginUrl = 'http://localhost:3000/auth-system.html';
    
    const mailOptions = {
        from: this.configService.get('EMAIL_FROM'),
        to: email,
        subject: 'Your Temporary Password',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2>Temporary Password</h2>
                <p>Your temporary password is: <strong>${temporaryPassword}</strong></p>
                <p>Please use this password to login at:</p>
                <div style="margin: 20px 0;">
                    <a href="${loginUrl}" 
                       style="background-color: #007bff; color: white; padding: 12px 24px; 
                              text-decoration: none; border-radius: 4px; display: inline-block;">
                        Login Now
                    </a>
                </div>
                <p>You will be prompted to change your password after login.</p>
                <p>This temporary password will expire in 24 hours.</p>
            </div>
        `,
    };

    await this.transporter.sendMail(mailOptions);
}
}