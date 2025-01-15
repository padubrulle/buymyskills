import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SkillService } from './skill.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { Skill } from './entities/skill.entity';
import { validate as isUuid } from 'uuid'
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Skills')
@Controller('/skill')
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @Post()
  @ApiOperation({summary: 'Create a skill'})
  @ApiCreatedResponse({description: 'The skill has been successfully created.'})
  async create(@Body() createSkillDto: CreateSkillDto): Promise<Skill> {
    return this.skillService.create(createSkillDto);
  }

  @Get()
  @ApiOperation({summary: 'Get all skills'})
  @ApiOkResponse({description: 'Skills have been successfully retrieved.'})
  findAll(): Promise<Skill[]> {
    return this.skillService.findAll();
  }

  @Get(':searchTerm')
  @ApiOperation({summary: 'Get a skill by name or by id'})
  @ApiParam({name: 'searchTerm', description:'UUID or name of the skill'})
  @ApiOkResponse({description: 'The skill have been successfully retrieved.'})
  findOne(@Param('searchTerm') str: string) {
    if(isUuid(str)){
      return this.skillService.findOne(str);
    } else {
      return this.skillService.findByName(str)
    }
  }

  @Patch(':skillId')
  @ApiOperation({summary: 'Update a skill'})
  @ApiParam({name: 'skillId', description:'UUID of the skill'})
  @ApiOkResponse({description: 'The skill have been successfully updated'})
  update(@Param('skillId') id: string, @Body() updateSkillDto: UpdateSkillDto) {
    return this.skillService.update(id, updateSkillDto)
  }

  @Delete(':skillId')
  @ApiOperation({summary: 'Delete a skill'})
  @ApiParam({name: 'skillId', description:'UUID of the skill'})
  @ApiOkResponse({description: 'The skill have been successfully deleted'})
  remove(@Param('skillId') id: string) {
    return this.skillService.remove(id);
  }
}
