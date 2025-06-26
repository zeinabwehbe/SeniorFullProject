import { Injectable, Logger } from '@nestjs/common';
import * as PDFDocument from 'pdfkit';

@Injectable()
export class PdfService {
  private readonly logger = new Logger(PdfService.name);

  async generateCvPdf(cvData: any): Promise<Buffer> {
    return new Promise((resolve) => {
      const doc = new PDFDocument({ margin: 50 });
      const chunks: Buffer[] = [];
      
      doc.on('data', (chunk) => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      
      // Add content to PDF
      this.addContentToPdf(doc, cvData);
      
      doc.end();
    });
  }
  
  private addContentToPdf(doc: PDFKit.PDFDocument, cvData: any) {
    // Apply styling
    this.applyStyles(doc);
    
    // Header with name and title
    this.addHeader(doc, cvData);
    
    // Contact information
    this.addContactInfo(doc, cvData);
    
    // Summary/Bio
    if (cvData.bio || cvData.summary) {
      this.addSection(doc, 'Professional Summary');
      doc.fontSize(11).text(cvData.bio || cvData.summary || '');
      doc.moveDown(1);
    }
    
    // Experience
    if (cvData.experience && cvData.experience.length > 0) {
      this.addSection(doc, 'Work Experience');
      
      cvData.experience.forEach((job) => {
        doc.fontSize(12).font('Helvetica-Bold').text(job.title || job.job_title || '');
        doc.fontSize(11).font('Helvetica-Oblique').text(`${job.company} | ${job.startDate || job.start_date || ''} - ${job.endDate || job.end_date || 'Present'}`);
        doc.fontSize(11).font('Helvetica').text(job.description || '');
        doc.moveDown(1);
      });
    }
    
    // Education
    if (cvData.education && cvData.education.length > 0) {
      this.addSection(doc, 'Education');
      
      cvData.education.forEach((edu) => {
        doc.fontSize(12).font('Helvetica-Bold').text(edu.degree || '');
        doc.fontSize(11).font('Helvetica-Oblique').text(`${edu.institution} | ${edu.startDate || edu.start_date || ''} - ${edu.endDate || edu.end_date || 'Present'}`);
        if (edu.description) doc.fontSize(11).font('Helvetica').text(edu.description);
        doc.moveDown(1);
      });
    }
    
    // Projects (if available)
    if (cvData.projects && cvData.projects.length > 0) {
      this.addSection(doc, 'Projects');
      
      cvData.projects.forEach((project) => {
        doc.fontSize(12).font('Helvetica-Bold').text(project.title || project.project_name || '');
        if (project.technologies) doc.fontSize(11).font('Helvetica-Oblique').text(project.technologies);
        doc.fontSize(11).font('Helvetica').text(project.description || '');
        doc.moveDown(1);
      });
    }
    
    // Certifications (if available)
    if (cvData.certifications && cvData.certifications.length > 0) {
      this.addSection(doc, 'Certifications');
      
      cvData.certifications.forEach((cert) => {
        doc.fontSize(12).font('Helvetica-Bold').text(cert.name || cert.certification_name || '');
        doc.fontSize(11).font('Helvetica-Oblique').text(`${cert.issuer || cert.issuing_organization || ''} | ${cert.date || cert.issue_date || ''}`);
        doc.moveDown(0.5);
      });
      doc.moveDown(0.5);
    }
    
    // Skills
    if (cvData.skills && cvData.skills.length > 0) {
      this.addSection(doc, 'Skills');
      
      // List all skills with name and level, no grouping by type
      const skillList = cvData.skills.map(skill => {
        const skillName = skill.skillName || skill.name || skill.skill_name || '';
        const level = skill.level || '';
        return level ? `${skillName} (${level})` : skillName;
      });
      doc.fontSize(11).font('Helvetica').text(skillList.join(', '));
      doc.moveDown(0.5);
    }
    
    // Add page numbers
    const pageCount = doc.bufferedPageRange().count;
    for (let i = 0; i < pageCount; i++) {
      doc.switchToPage(i);
      doc.fontSize(10).text(
        `Page ${i + 1} of ${pageCount}`,
        doc.page.margins.left,
        doc.page.height - doc.page.margins.bottom - 20,
        { align: 'center' }
      );
    }
  }
  
  private applyStyles(doc: PDFKit.PDFDocument) {
    // Define font styles
    doc.font('Helvetica');
    doc.fillColor('#333333');
  }
  
  private addHeader(doc: PDFKit.PDFDocument, cvData: any) {
    const name = `${cvData.first_name || ''} ${cvData.last_name || ''}`.trim() || 'CV Profile';
    
    doc.fontSize(24).font('Helvetica-Bold').fillColor('#0066cc').text(name, { align: 'center' });
    
    if (cvData.title || cvData.job_title) {
      doc.moveDown(0.2).fontSize(16).font('Helvetica').fillColor('#555555').text(cvData.title || cvData.job_title, { align: 'center' });
    }
    
    doc.moveDown(1);
    
    // Reset text color
    doc.fillColor('#333333');
  }
  
  private addContactInfo(doc: PDFKit.PDFDocument, cvData: any) {
    doc.fontSize(11).font('Helvetica');
    
    // Create horizontal layout for contact info
    const contactInfo = [];
    
    if (cvData.email) contactInfo.push(`Email: ${cvData.email}`);
    if (cvData.phone) contactInfo.push(`Phone: ${cvData.phone}`);
    if (cvData.location || cvData.address) contactInfo.push(`Location: ${cvData.location || cvData.address}`);
    if (cvData.website) contactInfo.push(`Website: ${cvData.website}`);
    if (cvData.linkedin) contactInfo.push(`LinkedIn: ${cvData.linkedin}`);
    
    doc.text(contactInfo.join(' | '), { align: 'center' });
    
    doc.moveDown(1.5);
    
    // Add horizontal line
    doc.moveTo(doc.page.margins.left, doc.y)
       .lineTo(doc.page.width - doc.page.margins.right, doc.y)
       .stroke('#dddddd');
       
    doc.moveDown(1);
  }
  
  private addSection(doc: PDFKit.PDFDocument, title: string) {
    doc.fontSize(14).font('Helvetica-Bold').fillColor('#0066cc').text(title);
    doc.moveDown(0.5);
    
    // Add thin line under section title
    doc.moveTo(doc.page.margins.left, doc.y)
       .lineTo(doc.page.width - doc.page.margins.right, doc.y)
       .stroke('#dddddd');
       
    doc.moveDown(0.5);
    
    // Reset text color
    doc.fillColor('#333333');
  }
}