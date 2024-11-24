import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTalentDto } from './dto/create-talent.dto';
import { UpdateTalentDto } from './dto/update-talent.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Talent } from './entities/talent.entity';
import { DataSource, Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import { SALTROUNDS } from 'src/constants/constants';
import { Skill } from 'src/skill/entities/skill.entity';

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

  async findSkillsForThisUser(id: string){
    return await this.talentRepository.findOne({
      where: {id: id},
      relations: ['skills']
    })
  }

  async update(id: string, UpdateTalentDto: UpdateTalentDto): Promise<Talent> {
    await this.talentRepository.update(id, UpdateTalentDto);
    return await this.findOne(id);
  }

  async addSkillToUser(userId: string, skill: Skill) {
    const user = await this.talentRepository.findOne({ where: { id: userId }, relations: ['skills'] });
    if (user) {
      user.skills.push(skill);
      await this.talentRepository.save(user);
    }
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
