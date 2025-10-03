import { ApiProperty } from '@nestjs/swagger';

export class CustomerDTO {
  @ApiProperty({ example: 'Anh Cuong' })
  name: string;

  @ApiProperty({ example: 'KH000001' })
  referanceId: string;
}
