import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getConnection(): Object {
    return {
      message: 'Backend is running at: ' + process.env.PORT,
    };
  }
}
