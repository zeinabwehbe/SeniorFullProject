import { Module } from '@nestjs/common';
import { CvController } from './cv.controller';
import { EmailService } from '../email/email.service';
import { PdfService } from '../pdf/pdf.service';
import { CvService } from './cv.service';

@Module({
  controllers: [CvController],
  providers: [CvService, EmailService, PdfService],
  exports: [CvService],
})
export class CvModule {}