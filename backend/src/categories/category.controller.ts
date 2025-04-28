import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpException, Query,Logger } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { CategoryResponseDto } from './dto/category.response';
import { ParseIntPipe } from '@nestjs/common';

/**
 * Controller for handling category-related requests
 */
@Controller('categories')
export class CategoryController {
    private readonly logger = new Logger(CategoryController.name);

  constructor(private readonly categoryService: CategoryService) {}

  /**
   * Create a new category
   * @param createCategoryDto The data for creating a new category
   * @returns The created category
   */
  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto): Promise<CategoryResponseDto> {
    return await this.categoryService.create(createCategoryDto);
  }

  /**
   * Get all categories
   * @returns A list of all categories
   */
  @Get()
  async findAll(): Promise<CategoryResponseDto[]> {
    const categories = await this.categoryService.findAll();
    return categories.map(category => this.categoryService.mapToResponseDto(category));
  }

  /**
   * Get a category by ID
   * @param id The ID of the category to retrieve
   * @returns The category with the specified ID
   */
  // 🔹 Get a single category by ID
  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CategoryResponseDto> {
    const category = await this.categoryService.findOne(id);
    return this.categoryService.mapToResponseDto(category);
  }
  /**
   * Search for categories by name
   * @param name The name to search for
   * @returns A list of categories matching the name
   */
  @Get('search')
  async searchByName(@Query('name') name: string): Promise<Category[]> {
    try {
      return await this.categoryService.searchByName(name);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to search categories',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Update a category
   * @param id The ID of the category to update
   * @param updateCategoryDto The data for updating the category
   * @returns The updated category
   */
  // 🔹 Update a category
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<CategoryResponseDto> {
    const category = await this.categoryService.update(id, updateCategoryDto);
    return this.categoryService.mapToResponseDto(category);
  }


  /**
   * Delete a category
   * @param id The ID of the category to delete
   * @returns A success message
   */// 🔹 Delete a category
  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    await this.categoryService.remove(id);
    return { message: 'Category deleted successfully' };
  }
} 