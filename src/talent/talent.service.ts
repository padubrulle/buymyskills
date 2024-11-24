import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTalentDto } from './dto/create-talent.dto';
import { UpdateTalentDto } from './dto/update-talent.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Talent } from './entities/talent.entity';
import { DataSource, Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import { SALTROUNDS } from 'src/constants/constants';

@Injectable()
export class TalentService {

  constructor(
    @InjectRepository(Talent)
    private talentRepository: Repository<Talent>,
    private dataSource: DataSource,
  ) {}

  async create(CreateTalentDto: CreateTalentDto) {
    try {
      const hash = await bcrypt.hash(CreateTalentDto.password, SALTROUNDS);
      CreateTalentDto.password = hash;
      return this.talentRepository.save(CreateTalentDto);
    }catch (err){
      throw new Error(`Error hashing password: ${err}`);
    }
  }

  findAll(): Promise<Talent[]> {
    return this.talentRepository.find();
  }

  findOne(id: string): Promise<Talent> {
    return this.talentRepository.findOne({where: {id: id}});
  }

  async findUserWithMatchingPw(id: string, password: string): Promise<boolean> {
    const user = await this.findOne(id);
    return await bcrypt.compare(password, user.password);
  }

  async findUserWithNameAndPw(email: string, password: string): Promise<boolean> {
    const user = await this.talentRepository.findOneBy({email: email});
    return await bcrypt.compare(password, user.password);
  }

  async update(id: string, UpdateTalentDto: UpdateTalentDto): Promise<Talent> {
    await this.talentRepository.update(id, UpdateTalentDto);
    return await this.findOne(id);
  }

  async remove(id: string) {
    const talent = await this.findOne(id);
    if(talent){
      this.talentRepository.delete(id)
      return { deleted: true, talentId: talent.id, talentFirstName: talent.first_name, talentLastName: talent.last_name, talentCompany: talent.current_company};
    } else {
      throw new HttpException('talent not found', HttpStatus.NOT_FOUND)
    }
  }
}
