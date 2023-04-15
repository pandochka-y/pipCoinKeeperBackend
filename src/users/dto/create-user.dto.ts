import { ApiProperty } from '@nestjs/swagger'

export class CreateUserWebDto {
  @ApiProperty({ example: 'example@example.com', description: 'Unique email' })
  readonly email: string

  @ApiProperty({ example: 'password', description: 'password' })
  readonly password: string
}

export class CreateUserTelegramDto {
  @ApiProperty({ example: '21939129312', description: 'telegram id from bot' })
  readonly telegram_id: number
}

// export const CreateUserDto = CreateUserWebDto | CreateUserTelegramDto
