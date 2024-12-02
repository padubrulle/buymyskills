import { Module } from '@nestjs/common';
import { TalentService } from './talent.service';
import { TalentController } from './talent.controller';
import { Talent } from './entities/talent.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Company } from 'src/Company/entities/company.entity';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Talent, User, Company])],
  exports: [TypeOrmModule],
  controllers: [TalentController],
  providers: [TalentService, UserService],
})
export class TalentModule {}
