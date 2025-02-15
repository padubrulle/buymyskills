import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
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

  @Get(':uuid')
  findOne(@Param('uuid', new ParseUUIDPipe()) uuid: string): Promise<Talent> {
    return this.talentService.findOne(uuid);
  }

  @Get(':uuid/skills')
  findSkillsForThisUser(@Param('uuid', new ParseUUIDPipe()) uuid: string){
    return this.talentService.findSkillsForThisUser(uuid);
  }

  @Post(':uuid/skills')
  addSkillToUser(@Param('uuid', new ParseUUIDPipe()) uuid: string, @Body() skill: Skill){
    return this.talentService.addSkillToUser(uuid, skill);
  }

  @Patch(':uuid')
  update(@Param('uuid', new ParseUUIDPipe()) uuid: string, @Body() updateTalentDto: UpdateTalentDto): Promise<Talent> {
    return this.talentService.update(uuid, updateTalentDto);
  }

  @Delete(':uuid')
  remove(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.talentService.remove(uuid);
  }
}
