import {
    Controller,
    Post,
    Body,
    Param,
    UseGuards,
    Logger,
    Patch,
    Get,
    Delete,
    ParseIntPipe,
  } from '@nestjs/common';
  import { CertificationService } from './certification.service';
  import { Certification } from './entities/certification.entity';
  import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
  import { CreateCertificationDto } from './dto/create-certification.dto';
  import { CertificationResponseDto } from './dto/certification.response.dto';
  import { UpdateCertificationDto } from './dto/update-certification.dto';
  
  @Controller('certifications')
  export class CertificationController {
    private readonly logger = new Logger(CertificationController.name);
  
    constructor(private certificationService: CertificationService) {}
  
    @Post()
    @UseGuards(JwtAuthGuard)
    async create(@Body() createCertificationDto: CreateCertificationDto): Promise<CertificationResponseDto> {
      const certification = await this.certificationService.create(createCertificationDto);
      return certification;
    }
  
    @Get()
    @UseGuards(JwtAuthGuard)
    async findAll(): Promise<CertificationResponseDto[]> {
      const certifications = await this.certificationService.findAllCertifications();
      return certifications;
    }
  
    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<CertificationResponseDto> {
      const certification = await this.certificationService.findCertificationById(id);
      return certification.toDto();
    }
  }