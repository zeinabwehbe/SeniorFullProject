import { Body, Controller, HttpException, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { CvService } from './cv.service';
import { SendCvEmailDto } from './dto/send-cv-email.dto';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('cv')
export class CvController {
  constructor(private readonly cvService: CvService) {}

  // Existing email sending endpoint
  @UseGuards(JwtAuthGuard)
  @Post('send-email')
  async sendCvEmail(@Body() sendCvEmailDto: SendCvEmailDto) {
    return this.cvService.sendCvByEmail(sendCvEmailDto);
  }
  
  // New endpoint for PDF generation and download
  @UseGuards(JwtAuthGuard)
  @Post('generate-pdf')
  async generatePdf(@Body() body: { cvData: any }, @Res() res: Response) {
    try {
      const pdfBuffer = await this.cvService.generatePdf(body.cvData);
      
      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename=${body.cvData.first_name || 'CV'}_${body.cvData.last_name || 'Profile'}.pdf`,
        'Content-Length': pdfBuffer.length,
      });
      
      res.end(pdfBuffer);
    } catch (error) {
      throw new HttpException('Failed to generate PDF', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

