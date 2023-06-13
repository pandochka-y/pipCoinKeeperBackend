import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

import { OperationsService } from './operations.service'
import { GetOperationsDto } from './dto/get-operations.dto'
import { CreateOperationDto } from './dto/create-operation.dto'
import { Operation } from './operations.model'

@ApiTags('Operations')
@Controller('operations')
export class OperationsController {
  constructor(private readonly operationsService: OperationsService) {
  }

  @ApiOperation({ summary: 'Get all operations' })
  @ApiResponse({ status: 200, type: [Operation] })
  @Get()
  getBoardOperations(@Query() query: GetOperationsDto) {
    return this.operationsService.getBoardOperations(query)
  }

  @ApiOperation({ summary: 'Create operations' })
  @ApiResponse({ status: 200, type: Operation })
  @Post()
  createOperation(@Body() dto: CreateOperationDto) {
    return this.operationsService.createOperation(dto)
  }
}
