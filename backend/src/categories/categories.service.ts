import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category)
    private categoryModel: typeof Category,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoryModel.create({ ...createCategoryDto });
  }

  async findAll(): Promise<Category[]> {
    return this.categoryModel.findAll();
  }

  async findOne(id: number): Promise<Category> {
    return this.categoryModel.findByPk(id);
  }

  async update(
    id: number,
    updateCategoryDto: Partial<CreateCategoryDto>,
  ): Promise<Category> {
    const category = await this.findOne(id);
    return category.update(updateCategoryDto);
  }

  async remove(id: number): Promise<void> {
    const category = await this.findOne(id);
    await category.destroy();
  }
}
