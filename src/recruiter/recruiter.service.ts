import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRecruiterDto } from './dto/create-recruiter.dto';
import { UpdateRecruiterDto } from './dto/update-recruiter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Recruiter } from './entities/recruiter.entity';
import { DataSource, Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import { SALTROUNDS } from 'src/constants/constants';
import { hash } from 'crypto';

@Injectable()
export class RecruiterService {

  constructor(
    @InjectRepository(Recruiter)
    private recruiterRepository: Repository<Recruiter>,
    private dataSource: DataSource,
  ) {}

  async create(createRecruiterDto: CreateRecruiterDto) {
    try {
      const hash = await bcrypt.hash(createRecruiterDto.password, SALTROUNDS);
      console.log('hash: ', hash)
      createRecruiterDto.password = hash;
      return this.recruiterRepository.save(createRecruiterDto);
    }catch (err){
      throw new Error(`Error hashing password: ${err}`);
    }
  }

  findAll(): Promise<Recruiter[]> {
    return this.recruiterRepository.find();
  }

  findOne(id: string): Promise<Recruiter> {
    return this.recruiterRepository.findOne({where: {id: id}});
  }

  async findUserWithMatchingPw(id: string, password: string): Promise<boolean> {
    const user = await this.findOne(id);
    return await bcrypt.compare(password, user.password);
  }

  async findUserWithNameAndPw(email: string, password: string): Promise<boolean> {
    const user = await this.recruiterRepository.findOneBy({email: email});
    return await bcrypt.compare(password, user.password);
  }

  async update(id: string, updateRecruiterDto: UpdateRecruiterDto): Promise<Recruiter> {
    await this.recruiterRepository.update(id, updateRecruiterDto);
    return await this.findOne(id);
  }

  async remove(id: string) {
    const recruiter = await this.findOne(id);
    if(recruiter){
      this.recruiterRepository.delete(id)
      return { deleted: true, recruiterId: recruiter.id, recruiterFirstName: recruiter.first_name, recruiterLastName: recruiter.last_name, recruiterCompany: recruiter.company};
    } else {
      throw new HttpException('Recruiter not found', HttpStatus.NOT_FOUND)
    }
  }
}
