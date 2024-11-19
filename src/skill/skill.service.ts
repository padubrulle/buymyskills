import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Skill } from './entities/skill.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class SkillService {
  constructor(
    @InjectRepository(Skill)
    private skillRepository: Repository<Skill>,
    private dataSource: DataSource,
  ) {}
  async create(createSkillDto: CreateSkillDto): Promise<Skill> {
    await this.skillRepository.save(createSkillDto);
    return this.skillRepository.create(createSkillDto);
  }

  findAll(): Promise<Skill[]> {
    return this.skillRepository.find({order: {name: "ASC"}});
  }

  findOne(id: string):Promise<Skill> {
    return this.skillRepository.findOne({where: {id: id}});
  }

  async update(id: string, updateSkillDto: UpdateSkillDto): Promise<Skill> {
    await this.skillRepository.update(id, updateSkillDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<any>{
    const skill = await this.findOne(id);
    if(skill){
      this.skillRepository.delete(id)
      return { deleted: true, skillId: skill.id, skillName: skill.name};
    } else {
      throw new HttpException('Skill not found', HttpStatus.NOT_FOUND)
    }
  }
}
