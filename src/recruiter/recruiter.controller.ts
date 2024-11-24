import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
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

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Recruiter> {
    return this.recruiterService.findOne(id);
  }

  /**
   * Endpoint to be deleted. It's only for testing purpose.
   */
  @Get(':id/password/:password')
  async findUserWithMatchingPw(@Param('id') id: string, @Param('password') password: string) {
    return { userFound: await this.recruiterService.findUserWithMatchingPw(id, password)};
  }

  @Get(':email/:password')
  async findUserWithNameAndPw(@Param('email') email: string, @Param('password') password: string) {
    return await this.recruiterService.findUserWithNameAndPw(email, password);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecruiterDto: UpdateRecruiterDto): Promise<Recruiter> {
    return this.recruiterService.update(id, updateRecruiterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recruiterService.remove(id);
  }
}
