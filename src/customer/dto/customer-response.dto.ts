import { ApiProperty } from '@nestjs/swagger';

export class CustomerProps {
  @ApiProperty({ example: 1 })
  id: number;
  @ApiProperty({ example: 'Anh Cuong' })
  name: string;
  @ApiProperty({ example: 'KH000001' })
  referanceId: string;
}
