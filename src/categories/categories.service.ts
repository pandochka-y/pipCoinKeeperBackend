import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Op } from 'sequelize'

import { Category } from './categories.model'

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Category) private categoryService: typeof Category) {}

  async createCategory(dto: CreateCategoryDto) {
    return await this.categoryService.create({ name: dto.name, board_id: dto.board_id })
  }

  async getAllBoardCategories(id: number) {
    return await this.categoryService.findAll({
      where: {
        board_id: {
          [Op.or]: [id, null],
        },
      },
      include: { all: true },
    })
  }

  async removeCategory(id: number) {
    return await this.categoryService.destroy({ where: { id } })
  }
}
