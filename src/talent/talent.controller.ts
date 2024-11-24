import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TalentService } from './talent.service';
import { CreateTalentDto } from './dto/create-talent.dto';
import { UpdateTalentDto } from './dto/update-talent.dto';
import { Talent } from './entities/talent.entity';
import { Skill } from 'src/skill/entities/skill.entity';

@Controller('talent')
export class TalentController {
  constructor(private readonly talentService: TalentService) {}

  @Post()
  create(@Body() createTalentDto: CreateTalentDto) {
    return this.talentService.create(createTalentDto);
  }

  @Get()
  findAll(): Promise<Talent[]> {
    return this.talentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Talent> {
    return this.talentService.findOne(id);
  }

  /**
   * Endpoint to be deleted. It's only for testing purpose.
   */
  @Get(':id/password/:password')
  async findUserWithMatchingPw(@Param('id') id: string, @Param('password') password: string) {
    return { userFound: await this.talentService.findUserWithMatchingPw(id, password)};
  }

  @Get(':email/pw/:password')
  async findUserWithNameAndPw(@Param('email') email: string, @Param('password') password: string) {
    return await this.talentService.findUserWithNameAndPw(email, password);
  }

  @Get(':id/skills')
  findSkillsForThisUser(@Param('id') id: string){
    return this.talentService.findSkillsForThisUser(id);
  }

  @Post(':id/skills')
  addSkillToUser(@Param('id') id: string, @Body() skill: Skill){
    return this.talentService.addSkillToUser(id, skill);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTalentDto: UpdateTalentDto): Promise<Talent> {
    return this.talentService.update(id, updateTalentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.talentService.remove(id);
  }
}
