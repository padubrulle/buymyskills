import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { SkillService } from './skill.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { Skill } from './entities/skill.entity';
import { validate as isUuid } from 'uuid'

@Controller('/skills')
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @Post()
  create(@Body() createSkillDto: CreateSkillDto) {
    return this.skillService.create(createSkillDto);
  }

  @Get()
  findAll(): Promise<Skill[]> {
    return this.skillService.findAll();
  }

  @Get(':str')
  findOne(@Param('str') str: string) {
    if(isUuid(str)){
      return this.skillService.findOne(str);
    } else {
      return this.skillService.findByName(str)
    }
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSkillDto: UpdateSkillDto) {
    return this.skillService.update(id, updateSkillDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.skillService.remove(id);
  }
}
