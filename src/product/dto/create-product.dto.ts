import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'SP000001' })
  referanceId: string;
  imgUrl?: string;
  @ApiProperty({ example: 'Thủ mì 2, 1ky' })
  name: string;
}
