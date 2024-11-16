import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private skillRepository: Repository<Category>,
    private dataSource: DataSource,
  ) {}
  create(createCategoryDto: CreateCategoryDto) {
    this.skillRepository.save(createCategoryDto);
    return this.skillRepository.create(createCategoryDto);
  }

  findAll(): Promise<Category[]> {
    return this.skillRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
