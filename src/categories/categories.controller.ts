import { Controller } from '@nestjs/common'

import { CategoriesService } from './categories.service'

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {
  }

  getAllBoardCategories(id: number) {
    return this.categoriesService.getAllBoardCategories(id)
  }

  createCategory(dto: CreateCategoryDto) {
    return this.categoriesService.createCategory(dto)
  }
}
