import { ApiProperty } from '@nestjs/swagger';

class ErrorResponse {
  @ApiProperty()
  statusCode: number;
  @ApiProperty()
  timestamp: Date;
  @ApiProperty()
  path: string;
  @ApiProperty()
  message: string | object;

  constructor(statusCode: number, timestamp: Date, path: string, message: string) {
    this.statusCode = statusCode;
    this.timestamp = timestamp;
    this.path = path;
    this.message = message;
  }
}

export default ErrorResponse;
