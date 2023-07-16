import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { User } from '../users/users.entity';
import { Report } from './reports.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Report]),
  ],
  providers: [ReportsService],
  controllers: [ReportsController],
})
export class ReportsModule {}
