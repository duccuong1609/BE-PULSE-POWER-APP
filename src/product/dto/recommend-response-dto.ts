import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RecommendProductInfo {
  @ApiProperty({ example: 'SP000001' })
  @IsString()
  product_id: string;
  recommendations: RecommendationProduct[];
}

type RecommendationProduct = {
  product_id: string;
  score: number;
  rank: number;
};
