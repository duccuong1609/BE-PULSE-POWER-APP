import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

  handleRequest(err, user, info, context) {
    if (err || !user) {
      console.log('[JwtAuthGuard] handleRequest', { err, user, info, context });
      throw err || new UnauthorizedException();
    }
    return user;
  }

}
