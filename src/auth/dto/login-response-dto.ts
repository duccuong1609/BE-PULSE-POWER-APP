import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { BaseUserInfoDto } from '../../users/dto/base-user-info.dto.js';

export class LoginResponseDto {
  @ApiProperty({ type: BaseUserInfoDto })
  user: BaseUserInfoDto;
  @ApiProperty({ example: '<token>' })
  @IsString()
  accessToken: string;
  @ApiProperty({ example: '<token>' })
  @IsString()
  refreshToken: string;
}
