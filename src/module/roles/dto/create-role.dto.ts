import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class CreateRoleDto {
  @IsNotEmpty({ message: 'Role name cannot be empty' })
  @ApiProperty({ example: 'ADMIN', description: 'role name' })
  readonly name: string
}
