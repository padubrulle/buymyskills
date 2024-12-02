import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import { SALTROUNDS } from 'src/constants/constants';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private dataSource: DataSource,
  ) {}

  async create(createUserDto: CreateUserDto) {
    if(await this.findByEmail(createUserDto.email)){
      throw new HttpException('An error occurred while creating your account. If the problem persists, please contact support.', HttpStatus.CONFLICT)
    } else {
      try {
        const hash = await bcrypt.hash(createUserDto.password, SALTROUNDS);
        createUserDto.password = hash;
        return this.userRepository.save(createUserDto);
      }catch (err){
        throw new Error(`Error hashing password: ${err}`);
      }
    }
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.userRepository.findOne({
      where: {id: id}
    });
  }

  async findByEmail(email: string): Promise<User>{
    return await this.userRepository.findOne({
      where:{email: email}
    });
  }

  async findUserWithMatchingPw(id: string, password: string): Promise<boolean> {
    const user = await this.findOne(id);
    return await bcrypt.compare(password, user.password);
  }

  async findUserWithNameAndPw(email: string, password: string): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: {email: email}
    });
    return await bcrypt.compare(password, user.password);
  }

  async findSkillsForThisUser(id: string){
    return await this.userRepository.findOne({
      where: {id: id},
      relations: ['skills']
    })
  }

  async update(id: string, UpdateUserDto: UpdateUserDto): Promise<User> {
    await this.userRepository.update(id, UpdateUserDto);
    return await this.findOne(id);
  }
  

  async remove(id: string) {
    const user = await this.findOne(id);
    if(user){
      this.userRepository.delete(id)
      return { deleted: true, userId: user.id, userFirstName: user.first_name, userLastName: user.last_name};
    } else {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND)
    }
  }
}
