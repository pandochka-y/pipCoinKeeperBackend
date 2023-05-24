import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator'

export class CreateUserWebDto {
  @IsEmail()
  @IsNotEmpty({ message: 'Email cannot be empty' })
  @ApiProperty({ example: 'example@example.com', description: 'Unique email' })
  readonly email: string

  @IsNotEmpty({ message: 'Password cannot be empty' })
  @ApiProperty({ example: 'password', description: 'password' })
  readonly password: string

  @IsOptional()
  @ApiProperty({ example: 'Stepan', description: 'user name' })
  readonly name: string
}

export class CreateUserTelegramDto {
  @IsNotEmpty({ message: 'Telegram id cannot be empty' })
  @ApiProperty({ example: '21939129312', description: 'telegram id from bot' })
  readonly telegram_id: number

  @IsOptional()
  @ApiProperty({ example: 'Stepan', description: 'user firstname' })
  readonly first_name: string

  @IsOptional()
  @ApiProperty({ example: 'Not Stepan', description: 'user lastname' })
  readonly last_name: string
}

// export const CreateUserDto = CreateUserWebDto | CreateUserTelegramDto
