import { Injectable } from '@nestjs/common';
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
  create(createSkillDto: CreateSkillDto) {
    this.skillRepository.save(createSkillDto);
    return this.skillRepository.create(createSkillDto);
  }

  findAll(): Promise<Skill[]> {
    return this.skillRepository.find();
  }

  findOne(id: string):Promise<Skill> {
    return this.skillRepository.findOne({where: {id: id}});
  }

  async update(id: string, updateSkillDto: UpdateSkillDto): Promise<Skill> {
    await this.skillRepository.update(id, updateSkillDto);
    return this.findOne(id);
  }

  remove(id: number) {
    return `This action removes a #${id} skill`;
  }
}
