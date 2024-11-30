import { Module } from '@nestjs/common';
import { RecruiterService } from './recruiter.service';
import { RecruiterController } from './recruiter.controller';
import { Recruiter } from './entities/recruiter.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from 'src/Company/entities/company.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Recruiter, User, Company])],
  exports: [TypeOrmModule],
  controllers: [RecruiterController],
  providers: [RecruiterService],
})
export class RecruiterModule {}
