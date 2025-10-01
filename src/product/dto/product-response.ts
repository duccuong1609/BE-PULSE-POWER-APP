import { ApiProperty } from '@nestjs/swagger';

export class ProductResponse {
  @ApiProperty()
  id: number;
  @ApiProperty()
  referanceId: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  description?: string;
  @ApiProperty()
  imgUrl?: string;
  @ApiProperty()
  price?: number;
}
