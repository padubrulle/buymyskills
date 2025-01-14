import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>
  ) {}
  create(createCategoryDto: CreateCategoryDto) {
    this.categoryRepository.save(createCategoryDto);
    return this.categoryRepository.create(createCategoryDto);
  }

  findAll(): Promise<Category[]> {
    return this.categoryRepository.find({order: { id: "ASC"}});
  }

  findOne(id: string): Promise<Category> {
    return this.categoryRepository.findOne({where: {id: id}});
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    await this.categoryRepository.update(id, updateCategoryDto);
    return await this.findOne(id);
  }

  async remove(id: string) {
    const category = await this.findOne(id);
    if(category){
      this.categoryRepository.delete(id)
      return { deleted: true, categoryId: category.id, categoryName: category.name};
    } else {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND)
    }
  }
}
