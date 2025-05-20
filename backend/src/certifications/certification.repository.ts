import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Transaction } from 'sequelize';
import { Certification } from './entities/certification.entity';
import { CreateCertificationDto } from './dto/create-certification.dto';
import { UpdateCertificationDto } from './dto/update-certification.dto';

@Injectable()
export class CertificationRepository {
  constructor(
    @InjectModel(Certification)
    private readonly certificationModel: typeof Certification,
  ) {}

  async findCertificationById(id: number): Promise<Certification | null> {
    return await this.certificationModel.findOne({ where: { id } });
  }

  async findAllCertifications(): Promise<Certification[]> {
    return this.certificationModel.findAll();
  }

  async findAllCertificationsByUserId(userId: number): Promise<Certification[]> {
    return this.certificationModel.findAll({ where: { userId } });
  }

  async insertCertification(
    createCertificationDto: CreateCertificationDto,
    transaction?: Transaction,
  ): Promise<Certification> {
    return this.certificationModel.create(createCertificationDto, { transaction });
  }

  async updateCertification(certification: Certification, updateCertificationDto: UpdateCertificationDto): Promise<Certification> {
    return await certification.update(updateCertificationDto);
  }

  async deleteCertification(id: number): Promise<void> {
    await this.certificationModel.destroy({ where: { id } });
  }
}