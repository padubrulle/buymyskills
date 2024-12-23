import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':uuid')
  findOne(@Param('uuid', new ParseUUIDPipe()) uuid: string): Promise<User> {
    return this.userService.findOne(uuid);
  }

  /**
   * Endpoint to be deleted. It's only for testing purpose.
   */
  @Get(':uuid/password/:password')
  async findUserWithMatchingPw(@Param('uuid', new ParseUUIDPipe()) uuid: string, @Param('password') password: string) {
    return { userFound: await this.userService.findUserWithMatchingPw(uuid, password)};
  }

  @Get(':email/pw/:password')
  async findUserWithEmailAndPw(@Param('email') email: string, @Param('password') password: string) {
    return await this.userService.findUserWithEmailAndPw(email, password);
  }

  @Patch(':uuid')
  update(@Param('uuid', new ParseUUIDPipe()) uuid: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.userService.update(uuid, updateUserDto);
  }

  @Delete(':uuid')
  remove(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.userService.remove(uuid);
  }
}
