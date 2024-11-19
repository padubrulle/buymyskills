import { Injectable } from '@nestjs/common';
import { CreateRecruiterDto } from './dto/create-recruiter.dto';
import { UpdateRecruiterDto } from './dto/update-recruiter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Recruiter } from './entities/recruiter.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class RecruiterService {

  constructor(
    @InjectRepository(Recruiter)
    private recruiterRepository: Repository<Recruiter>,
    private dataSource: DataSource,
  ) {}

  create(createRecruiterDto: CreateRecruiterDto) {
    this.recruiterRepository.save(createRecruiterDto);
    return this.recruiterRepository.create(createRecruiterDto);
  }

  findAll() {
    return `This action returns all recruiter`;
  }

  findOne(id: number) {
    return `This action returns a #${id} recruiter`;
  }

  update(id: number, updateRecruiterDto: UpdateRecruiterDto) {
    return `This action updates a #${id} recruiter`;
  }

  remove(id: number) {
    return `This action removes a #${id} recruiter`;
  }
}
