import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Op } from 'sequelize'

import { Category } from './categories.model'
import { CreateCategoryDto } from './dto/create-category.dto'
import { CategoryLimit } from './categories-limit.model'
import { GetCategoryListDto } from './dto/get-category-list.dto'

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category) private categoryService: typeof Category,
    @InjectModel(CategoryLimit) private categoryLimitService: typeof CategoryLimit,
  ) {}

  async createCategory(dto: CreateCategoryDto) {
    return await this.categoryService.create({ name: dto.name, board_id: dto.board_id })
  }

  async getCategoryById(id: number) {
    return await this.categoryService.findByPk(id)
  }

  async getAllBoardCategories(dto: GetCategoryListDto) {
    console.log('dto', dto)
    return await this.categoryService.findAndCountAll({
      where: {
        board_id: {
          [Op.or]: [dto.board_id, null],
        },
      },
      order: [
        ['name', 'ASC'],
      ],
      limit: dto.limit,
      offset: dto.offset,
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
