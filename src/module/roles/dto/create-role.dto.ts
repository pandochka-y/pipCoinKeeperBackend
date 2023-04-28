import { ApiProperty } from '@nestjs/swagger'

export class CreateRoleDto {
  @ApiProperty({ example: 'ADMIN', description: 'role name' })
  readonly value: string
}
