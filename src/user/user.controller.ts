import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({summary: 'Create an user'})
  @ApiCreatedResponse({description: 'The user has been successfully created.'})
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({summary: 'Get all users'})
  @ApiOkResponse({description: 'Users have been successfully retrieved.'})
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':userId')
  @ApiOperation({summary: 'Get an user by id'})
  @ApiOkResponse({description: 'The user have been successfully retrieved.'})
  findOne(@Param('userId', new ParseUUIDPipe()) uuid: string): Promise<User> {
    return this.userService.findOne(uuid);
  }

  @Patch(':userId')
  @ApiOperation({summary: 'Update an user'})
  @ApiOkResponse({description: 'The user have been successfully updated'})
  update(@Param('userId', new ParseUUIDPipe()) uuid: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.userService.update(uuid, updateUserDto);
  }

  @Delete(':userId')
  @ApiOperation({summary: 'Delete an user'})
  @ApiOkResponse({description: 'The user have been successfully deleted'})
  remove(@Param('userId', new ParseUUIDPipe()) uuid: string) {
    return this.userService.remove(uuid);
  }
}
