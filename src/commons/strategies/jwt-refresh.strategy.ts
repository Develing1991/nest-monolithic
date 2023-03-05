import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Cache } from 'cache-manager';
import { Request } from 'express';
import { Strategy } from 'passport-jwt';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  private refreshToken: string;
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {
    super({
      jwtFromRequest: (req: Request) => {
        this.refreshToken = req.cookies.refreshToken;
        return this.refreshToken;
      },
      secretOrKey: process.env.REFRSHTK_SKEY,
    });
  }
  async validate({ email, sub: userId }: { email: string; sub: string }) {
    const logoutRefreshToken = await this.cacheManager.get(this.refreshToken);

    if (logoutRefreshToken) {
      throw new UnauthorizedException('만료된 토큰입니다.');
    }

    return { userId, email };
  }
}
