import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Cache } from 'cache-manager';
@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy, 'access') {
  private accessToken: string;

  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {
    super({
      jwtFromRequest: (req: Request) => {
        // const aaa = ExtractJwt.fromAuthHeaderAsBearerToken();
        const authorizationHeader = req.headers.authorization;
        if (
          !authorizationHeader ||
          !authorizationHeader.startsWith('Bearer ')
        ) {
          // Handle missing or invalid authorization header
          this.accessToken = 'invalidToken';
        } else {
          this.accessToken = authorizationHeader.slice(7);
        }

        return this.accessToken;
      },
      ignoreExpiration: false,
      secretOrKey: process.env.ACCESSTK_SKEY,
    });
  }
  async validate({ email, sub: userId }: { email: string; sub: string }) {
    const logoutAccessToken = await this.cacheManager.get(this.accessToken);

    if (logoutAccessToken) {
      throw new UnauthorizedException('만료된 토큰입니다.');
    }
    return { userId, email };
  }
}
