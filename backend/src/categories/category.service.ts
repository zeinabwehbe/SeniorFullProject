import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryResponseDto } from './dto/category.response';
import { Category } from './entities/category.entity';

/**
 * Service for handling category-related business logic
 */
@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  /**
   * Create a new category
   * @param createCategoryDto The data for creating a new category
   * @returns The created category
   * @throws ConflictException if a category with the same name already exists
   */
  async create(createCategoryDto: CreateCategoryDto): Promise<CategoryResponseDto> {
    // Check if a category with the same name already exists (case-insensitive)
    const exists = await this.categoryRepository.existsByName(createCategoryDto.name);
    if (exists) {
      throw new ConflictException(`A category with the name "${createCategoryDto.name}" already exists`);
    }

    const category = await this.categoryRepository.create(createCategoryDto);
    return this.mapToResponseDto(category);
    
  }

  /**
   * Get all categories
   * @returns A list of all categories
   */
  async findAll(): Promise<Category[]> {
    return this.categoryRepository.findAll();
  }

  /**
   * Get a category by ID
   * @param id The ID of the category to retrieve
   * @returns The category with the specified ID
   */
  async findOne(id: number): Promise<Category> {
 return this.categoryRepository.findById(id);
  }

  /**
   * Search for categories by name
   * @param name The name to search for
   * @returns A list of categories matching the name
   */
  async searchByName(name: string): Promise<Category[]> {
    return this.categoryRepository.findByName(name);
  }

  /**
   * Update a category
   * @param id The ID of the category to update
   * @param updateCategoryDto The data for updating the category
   * @returns The updated category
   * @throws ConflictException if a category with the same name already exists
   */
  async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
      const exists = await this.categoryRepository.existsByName(updateCategoryDto.name);
        if (exists) {
          throw new ConflictException(`A category with the name "${updateCategoryDto.name}" already exists`);
        
      }
    

    const category = await this.categoryRepository.findById(id);
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return this.categoryRepository.update(id, updateCategoryDto);
  }

  /**
   * Delete a category
   * @param id The ID of the category to delete
   * @returns True if the category was deleted, false otherwise
   */
  async remove(id: number): Promise<boolean> {
    const result = await this.categoryRepository.delete(id);
    if (!result) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return true;
  }

  /**
   * Map a Category entity to a CategoryResponseDto
   * @param category The Category entity to map
   * @returns A CategoryResponseDto
   */
  public mapToResponseDto(category: Category): CategoryResponseDto {
    return {
      id: category.id,
      name: category.name,
      profile_pic: category.profilePic,
      description: category.description,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt
    };
  }
} 