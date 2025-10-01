import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString } from 'class-validator'

export class RecommendProductInfo {
  @ApiProperty({ example: 'KH000002' })
  @IsString()
  user_id: string
  recommendations: RecommendationProduct[]
}

type RecommendationProduct = {
  MaHang: string
  Score: number
  Rank: number
}