import { Module } from '@nestjs/common';
import { RecruiterService } from './recruiter.service';
import { RecruiterController } from './recruiter.controller';
import { Recruiter } from './entities/recruiter.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Recruiter])],
  exports: [TypeOrmModule],
  controllers: [RecruiterController],
  providers: [RecruiterService],
})
export class RecruiterModule {}
