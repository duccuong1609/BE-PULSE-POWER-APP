import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString } from 'class-validator'

export class RecommendProductDto {
  @ApiProperty({ example: 'KH000002' })
  @IsString()
  user_id: string

  @ApiProperty({ example: '10' })
  @IsNumber()
  top_k: number
}