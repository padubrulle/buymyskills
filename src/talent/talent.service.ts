import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTalentDto } from './dto/create-talent.dto';
import { UpdateTalentDto } from './dto/update-talent.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Talent } from './entities/talent.entity';
import { DataSource, Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import { Skill } from 'src/skill/entities/skill.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TalentService {

  constructor(
    @InjectRepository(Talent)
    private talentRepository: Repository<Talent>,
    private userService: UserService,
    private dataSource: DataSource,
  ) {}

  async create(createTalentDto: CreateTalentDto) {
    if(await this.findByEmail(createTalentDto.email)){
      throw new HttpException('An error occurred while creating your account. If the problem persists, please contact support.', HttpStatus.CONFLICT)
    } else {
      try {
        createTalentDto.role = 'talent';
        await this.userService.create(createTalentDto)
        return this.talentRepository.save(createTalentDto);
      }catch (err){
        throw new Error(`Error: ${err}`);
      }
    }
  }

  findAll(): Promise<Talent[]> {
    return this.talentRepository.find({
      relations: ['user', 'current_company'],
    });
  }

  findOne(id: string): Promise<Talent> {
    return this.talentRepository.findOne({
      where: {
        user: { id: id},
      }, 
      relations: ['user']
    });
  }

  async findByEmail(email: string): Promise<Talent>{
    return await this.talentRepository.findOne({
      where: {
        user: {email: email},
      },
      relations: ['user']
    });
  }

  async findUserWithMatchingPw(id: string, password: string): Promise<boolean> {
    const talent = await this.findOne(id);
    return await bcrypt.compare(password, talent.user.password);
  }

  async findUserWithNameAndPw(email: string, password: string): Promise<boolean> {
    const talent = await this.talentRepository.findOne({
      where: {
        user: {email: email},
      },
      relations: ['user']
    });
    return await bcrypt.compare(password, talent.user.password);
  }

  async findSkillsForThisUser(id: string){
    return await this.talentRepository.findOne({
      where:{
        user:
        {id: id}
      },
      relations: ['skills']
    })
  }

  async update(id: string, UpdateTalentDto: UpdateTalentDto): Promise<Talent> {
    await this.talentRepository.update(id, UpdateTalentDto);
    return await this.findOne(id);
  }

  async addSkillToUser(userId: string, skill: Skill) {
    const user = await this.talentRepository.findOne({ 
      where: {
        user: { id: userId }
      }, 
      relations: ['skills'] });
    if (user) {
      user.skills.push(skill);
      await this.talentRepository.save(user);
    }
  }
  

  async remove(id: string) {
    const talent = await this.findOne(id);
    const user = talent.user;
    if(talent){
      this.talentRepository.delete(id)
      return { deleted: true, talentId: talent.id, talentFirstName: user.first_name, talentLastName: user.last_name, talentCompany: talent.current_company};
    } else {
      throw new HttpException('talent not found', HttpStatus.NOT_FOUND)
    }
  }
}
