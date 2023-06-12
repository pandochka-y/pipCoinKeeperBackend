import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Op } from 'sequelize'

import { Category } from './categories.model'
import { CreateCategoryDto } from './dto/create-category.dto'
import { CategoryLimit } from './categories-limit.model'

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category) private categoryService: typeof Category,
    @InjectModel(CategoryLimit) private categoryLimitService: typeof CategoryLimit,
  ) {}

  async createCategory(dto: CreateCategoryDto) {
    return await this.categoryService.create({ name: dto.name, board_id: dto.board_id })
  }

  async getAllBoardCategories(board_id: number) {
    return await this.categoryService.findAll({
      where: {
        board_id: {
          [Op.or]: [board_id, null],
        },
      },
    })
  }

  async setCategoryLimit(category_id: number, amount_limit: number) {
    const limit = await this.categoryLimitService.findOne({ where: { category_id } })
    if (!limit)
      return await this.categoryLimitService.create({ category_id, amount_limit })

    return await limit.update({ amount_limit })
  }

  async removeCategory(id: number) {
    return await this.categoryService.destroy({ where: { id } })
  }
}
