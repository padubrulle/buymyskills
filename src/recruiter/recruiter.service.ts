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

  findAll(): Promise<Recruiter[]> {
    return this.recruiterRepository.find();
  }

  findOne(id: string): Promise<Recruiter> {
    return this.recruiterRepository.findOne({where: {id: id}});
  }

  async update(id: string, updateRecruiterDto: UpdateRecruiterDto): Promise<Recruiter> {
    await this.recruiterRepository.update(id, updateRecruiterDto);
    return await this.findOne(id);
  }

  remove(id: number) {
    return `This action removes a #${id} recruiter`;
  }
}
