import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Certification } from './entities/certification.entity';
import { CertificationController } from './certification.controller';
import { CertificationRepository } from './certification.repository';
import { CertificationService } from './certification.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Certification]),
  ],
  controllers: [CertificationController],
  providers: [CertificationRepository, CertificationService],
  exports: [CertificationService, CertificationRepository],
})
export class CertificationModule {}