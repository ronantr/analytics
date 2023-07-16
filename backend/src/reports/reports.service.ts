import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { User } from '../users/users.entity';
import { Report } from './reports.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Report)
    private readonly reportRepository: Repository<Report>,
  ) {}

  async create(userId: number, createReportDto: CreateReportDto) {
    const user = await this.userRepository.findOne({ where: { id: userId.toString() } });
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }
    const report = this.reportRepository.create({ ...createReportDto, user: { id: user.id } });
    return this.reportRepository.save(report);
  }
  
  async findAll(user: User) {
    if (user.roles.includes('ROLE_ADMIN')) {
      return this.reportRepository.find();
    } else {
      return this.reportRepository.find({ where: { user: { id: user.id } } });
    }
  }
  
  
  

  async findOne(id: number) {
    const report = await this.reportRepository.findOne({ where: { id: id.toString() } });
    if (!report) {
      throw new NotFoundException(`Report with id ${id} not found`);
    }
    return report;
  }
  
  

  async update(id: number, updateReportDto: UpdateReportDto) {
    const report = await this.reportRepository.findOne({ where: { id: id.toString()  } });
    if (!report) {
      throw new NotFoundException(`Report with id ${id} not found`);
    }
    Object.assign(report, updateReportDto);
    return this.reportRepository.save(report);
  }
  

  async remove(id: number) {
    const report = await this.reportRepository.findOne({ where: { id: id.toString()  } });
    if (!report) {
      throw new NotFoundException(`Report with id ${id} not found`);
    }
    return this.reportRepository.remove(report);
  }
  
}
