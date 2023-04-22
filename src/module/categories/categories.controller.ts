import { Controller, Get, Post } from '@nestjs/common'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'

import { CategoriesService } from './categories.service'
import { Category } from './categories.model'

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {
  }

  @ApiOperation({ summary: 'Get all board categories' })
  @ApiResponse({ status: 200, description: 'Get all board categories', type: [Category] })
  @Get()
  getAllBoardCategories(board_id: number) {
    return this.categoriesService.getAllBoardCategories(board_id)
  }

  @ApiOperation({ summary: 'Create category' })
  @ApiResponse({ status: 200, description: 'Create category', type: Category })
  @Post()
  createCategory(dto: CreateCategoryDto) {
    return this.categoriesService.createCategory(dto)
  }
}
