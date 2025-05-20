import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

interface EmailOptions {
  to: string;
  subject: string;
  text: string;
  html?: string;
  attachments?: Array<{
    filename: string;
    content: Buffer | string;
  }>;
}

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;
  private readonly logger = new Logger(EmailService.name);

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
        host: 'smtp.office365.com',
        port: 587,
        secure: false, // DO NOT set to true for port 587
        auth: {
          user: 'zaynab.wehbe@st.ul.edu.lb',
          pass: 'zaynabedu.4', // Or app password if 2FA is enabled
        },
        tls: {
          rejectUnauthorized: false, // optional for development only
        },
      });
    
    // Verify connection configuration
    this.transporter.verify()
      .then(() => this.logger.log('SMTP server connection established successfully'))
      .catch(err => this.logger.error(`SMTP server connection error: ${err.message}`, err.stack));
  }

  async sendEmailWithAttachment(options: EmailOptions): Promise<void> {
    const { to, subject, text, html, attachments } = options;
    
    try {
      await this.transporter.sendMail({
        from: this.configService.get<string>('EMAIL_FROM'),
        to,
        subject,
        text,
        html,
        attachments,
      });
      
      this.logger.log(`Email sent successfully to ${to}`);
    } catch (error) {
      this.logger.error(`Failed to send email to ${to}: ${error.message}`, error.stack);
      throw new Error(`Failed to send email: ${error.message}`);
    }
  }
}