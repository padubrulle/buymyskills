import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRecruiterDto } from './dto/create-recruiter.dto';
import { UpdateRecruiterDto } from './dto/update-recruiter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Recruiter } from './entities/recruiter.entity';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class RecruiterService {

  constructor(
    @InjectRepository(Recruiter)
    private recruiterRepository: Repository<Recruiter>,
    private userService: UserService,
  ) {}

  async create(createRecruiterDto: CreateRecruiterDto) {
    if(await this.findByEmail(createRecruiterDto.email)){
      throw new HttpException('An error occurred while creating your account. If the problem persists, please contact support.', HttpStatus.CONFLICT)
    } else {
      try {
        createRecruiterDto.role = 'recruiter';
        await this.userService.create(createRecruiterDto)
        return this.recruiterRepository.save(createRecruiterDto);
      }catch (err){
        throw new Error(`Error: ${err}`);
      }
    }
  }

  findByEmail(email: string): Promise<Recruiter>{
    return this.recruiterRepository.findOne({
      where: {
        user: {email: email},
      },
      relations: ['user']
    });
  }

  findAll(): Promise<Recruiter[]> {
    return this.recruiterRepository.find();
  }

  findOne(id: string): Promise<Recruiter> {
    return this.recruiterRepository.findOne({
      where: {
        user: {id: id}
      },
      relations: ['user'],
  });
  }

  async findUserWithMatchingPw(id: string, password: string): Promise<boolean> {
    const  recruiter = await this.findOne(id);
    return await bcrypt.compare(password, recruiter.user.password);
  }

  async findUserWithEmailAndPw(email: string, password: string): Promise<boolean> {
    const recruiter = await this.findByEmail(email);
    return await bcrypt.compare(password, recruiter.user.password);
  }

  async update(id: string, updateRecruiterDto: UpdateRecruiterDto): Promise<Recruiter> {
    await this.recruiterRepository.update(id, updateRecruiterDto);
    return await this.findOne(id);
  }

  async remove(id: string) {
    const recruiter = await this.findOne(id);
    if(recruiter){
      this.recruiterRepository.delete(id)
      return { deleted: true, recruiterId: recruiter.id, recruiterFirstName: recruiter.user.first_name, recruiterLastName: recruiter.user.last_name, recruiterCompany: recruiter.company};
    } else {
      throw new HttpException('Recruiter not found', HttpStatus.NOT_FOUND)
    }
  }
}
