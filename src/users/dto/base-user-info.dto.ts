import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class BaseUserInfoDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email: string

  @ApiProperty({ example: 'johndoe' })
  @IsString()
  @IsNotEmpty()
  username: string

  @ApiProperty({ example: 'user', enum: ['user', 'admin'] })
  @IsOptional()
  @IsString()
  role: string

  @ApiProperty({ example: '2022-01-01T00:00:00.000Z' })
  createdAt: Date

  @ApiProperty({ example: '2022-01-01T00:00:00.000Z' })
  updatedAt: Date
}
