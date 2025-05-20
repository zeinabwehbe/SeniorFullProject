import { Injectable, Logger } from '@nestjs/common';
import { EmailService } from '../email/email.service';
import { PdfService } from '../pdf/pdf.service';
import { SendCvEmailDto } from './dto/send-cv-email.dto';

@Injectable()
export class CvService {
  private readonly logger = new Logger(CvService.name);

  constructor(
    private readonly emailService: EmailService,
    private readonly pdfService: PdfService,
  ) {}

  async sendCvByEmail(sendCvEmailDto: SendCvEmailDto) {
    const { email, cvData } = sendCvEmailDto;
    
    try {
      // Generate PDF from CV data
      const pdfBuffer = await this.pdfService.generateCvPdf(cvData);
      
      // Send email with PDF attachment
      await this.emailService.sendEmailWithAttachment({
        to: email,
        subject: `${cvData.first_name || ''} ${cvData.last_name || ''} - CV`,
        text: `Please find the CV for ${cvData.first_name || ''} ${cvData.last_name || ''} attached.`,
        html: `
          <div style="font-family: Arial, sans-serif; color: #333;">
            <h2>Your CV is attached</h2>
            <p>Thank you for using our CV generation service. Please find your CV attached to this email.</p>
            <p>If you have any questions or need to make changes, please log back into your account.</p>
            <hr>
            <p style="font-size: 12px; color: #666;">This is an automated message, please do not reply.</p>
          </div>
        `,
        attachments: [
          {
            filename: `${cvData.first_name || 'CV'}_${cvData.last_name || 'Profile'}.pdf`,
            content: pdfBuffer,
          },
        ],
      });
      
      this.logger.log(`CV sent to ${email} successfully`);
      return { success: true, message: `CV sent to ${email} successfully` };
    } catch (error) {
      this.logger.error(`Failed to send CV: ${error.message}`, error.stack);
      throw new Error(`Failed to send CV: ${error.message}`);
    }
  }
    // Existing constructor and methods...
  
    async generatePdf(cvData: any): Promise<Buffer> {
        try {
          // Use the same PDF service to generate the PDF
          return await this.pdfService.generateCvPdf(cvData);
        } catch (error) {
          this.logger.error(`Failed to generate PDF: ${error.message}`, error.stack);
          throw new Error(`Failed to generate PDF: ${error.message}`);
        }
      }
      
}
