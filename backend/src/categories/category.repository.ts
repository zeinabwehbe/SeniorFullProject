import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Op } from 'sequelize';

/**
 * Repository for handling category-related database operations
 */
@Injectable()
export class CategoryRepository {
  constructor(
    @InjectModel(Category)
    private categoryModel: typeof Category,
  ) {}

  /**
   * Check if a category with the given name already exists (case-insensitive)
   * @param name The name to check
   * @returns True if a category with the name exists, false otherwise
   */
  async existsByName(name: string): Promise<boolean> {
    const count = await this.categoryModel.count({
      where: {
        name: {
          [Op.iLike]: name, // Case-insensitive comparison
        },
      },
    });
    return count > 0;
  }

  /**
   * Create a new category
   * @param createCategoryDto The data for creating a new category
   * @returns The created category
   */
  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoryModel.create(createCategoryDto);
      
  }

  /**
   * Find all categories
   * @returns A list of all categories
   */
  async findAll(): Promise<Category[]> {
    return this.categoryModel.findAll();
  }

  /**
   * Find a category by ID
   * @param id The ID of the category to retrieve
   * @returns The category with the specified ID
   */
  async findById(id: number): Promise<Category> {
    return this.categoryModel.findByPk(id);
  }

  /**
   * Find categories by name (partial match)
   * @param name The name to search for
   * @returns A list of categories matching the name
   */
  async findByName(name: string): Promise<Category[]> {
    return this.categoryModel.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`,
        },
      },
    });
  }

  /**
   * Update a category
   * @param id The ID of the category to update
   * @param updateCategoryDto The data for updating the category
   * @returns The updated category
   */
  async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    const category = await this.findById(id);
    if (!category) {
      return null;
    }
    return category.update(updateCategoryDto);
  }

  /**
   * Delete a category
   * @param id The ID of the category to delete
   * @returns True if the category was deleted, false otherwise
   */
  async delete(id: number): Promise<boolean> {
    const category = await this.findById(id);
    if (!category) {
      return false;
    }

    await category.destroy();
    return true;
  }
} 