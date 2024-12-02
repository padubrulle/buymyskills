import { Module } from '@nestjs/common';
import { Company } from './entities/company.entity';
import { CompanyService } from './company.service';

@Module({
  providers: [Company, CompanyService]
})
export class CompanyModule {}
