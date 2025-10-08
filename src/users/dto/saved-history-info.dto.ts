import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SavedHistoryInfo {
  @ApiProperty({ example: 'https://domain.com/dashboard' })
  @IsString()
  link: string;

  @ApiProperty({ example: 'Dashboard' })
  @IsString()
  name: string;
}

export class UpdateSavedHistoryDto {
  @ApiProperty({ type: SavedHistoryInfo, isArray: true })
  savedHistory: SavedHistoryInfo[];
}
