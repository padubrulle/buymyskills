import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { RecruiterService } from './recruiter.service';
import { CreateRecruiterDto } from './dto/create-recruiter.dto';
import { UpdateRecruiterDto } from './dto/update-recruiter.dto';
import { Recruiter } from './entities/recruiter.entity';

@Controller('recruiter')
export class RecruiterController {
  constructor(private readonly recruiterService: RecruiterService) {}

  @Post()
  create(@Body() createRecruiterDto: CreateRecruiterDto) {
    return this.recruiterService.create(createRecruiterDto);
  }

  @Get()
  findAll(): Promise<Recruiter[]> {
    return this.recruiterService.findAll();
  }

  @Get('/email/:email')
  findByEmail(@Param('email') email: string): Promise<Recruiter> {
    return this.recruiterService.findByEmail(email);
  }

  @Get(':uuid')
  findOne(@Param('uuid', new ParseUUIDPipe()) uuid: string): Promise<Recruiter> {
    return this.recruiterService.findOne(uuid);
  }

  @Patch(':uuid')
  update(@Param('uuid', new ParseUUIDPipe()) uuid: string, @Body() updateRecruiterDto: UpdateRecruiterDto): Promise<Recruiter> {
    return this.recruiterService.update(uuid, updateRecruiterDto);
  }

  @Delete(':uuid')
  remove(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.recruiterService.remove(uuid);
  }
}
