import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-jwt';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor() {
    super({
      jwtFromRequest: (req: Request) => {
        const refreshToken = req.cookies.refreshToken;
        return refreshToken;
      },
      secretOrKey: process.env.REFRSHTK_SKEY,
    });
  }
  async validate({ email, sub: userId }: { email: string; sub: string }) {
    return { userId, email };
  }
}
