import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<any> {
    try {
      const request = context.switchToHttp().getRequest();
      const bearerToken = request.headers['authorization'];

      if (bearerToken == undefined) {
        throw new UnauthorizedException();
      }

      const tokenArray = bearerToken.split(' ');

      const rs = await this.userService.validateUserToken(tokenArray[1]);

      if (!rs) {
        throw new UnauthorizedException();
      }

      return !!rs;
    } catch (error) {
      if (error.code === 401) {
        throw new UnauthorizedException();
      } else {
        throw error;
      }
    }
  }
}
