import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthSignInOutputDto } from './dto/authSignIn.output.dto';
import { Cache } from 'cache-manager';
import { Request } from 'express';

interface IPayload {
  email: string;
  sub: string;
  iat: number;
  exp: number;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  // 로그인
  async login({ user, password, res }) {
    // 회원 검증
    await this.exactUser({ password, user });

    // refresh 토큰
    this.setRefreshToken({ user, res });

    // access 토큰
    return this.getAccessToken({ user });
  }

  // 회원 검증
  async exactUser({ password, user }) {
    if (!user) {
      throw new UnprocessableEntityException('일치하는 회원정보가 없습니다.');
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new UnprocessableEntityException('일치하는 회원정보가 없습니다.');
    }
  }

  // access 토큰
  async getAccessToken({ user }) {
    const accessToken = await this.createToken({
      user,
      type: 'access',
      res: null,
    });
    return new AuthSignInOutputDto(accessToken);
  }

  // refresh 토큰
  setRefreshToken({ user, res }) {
    this.createToken({ user, type: 'refresh', res });
  }

  createToken({ user, type, res }) {
    const token = this.jwtService.sign(
      {
        email: user.email, //
        sub: user.id,
      },
      {
        secret:
          type === 'access'
            ? process.env.ACCESSTK_SKEY
            : process.env.REFRSHTK_SKEY,
        expiresIn:
          type === 'access'
            ? process.env.ACCESSTK_EXPR
            : process.env.REFRSHTK_EXPR,
      },
    );

    if (type === 'refresh') {
      // 개발
      res.cookie('refreshToken', token, { path: '/' });
      // res.cookie('refreshToken', token, {
      //   path: '/',
      //   domain: '.front.com',
      //   SameSite: 'None',
      //   Secure: true,
      //   httpOnly: true,
      // });
      return;
    }
    return token;
  }

  // 로그아웃 (토큰 레디스 캐시 저장)
  async logout({ req }: { req: Request }) {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      // Handle missing or invalid authorization header
      // 잘못 된 헤더...
      return;
    }
    const accessToken = authorizationHeader.slice(7);
    const refreshToken = req.cookies.refreshToken;

    const { exp: accessExpireAt } = this.jwtService.decode(
      accessToken,
    ) as IPayload;

    const { exp: refreshExpireAt } = this.jwtService.decode(
      refreshToken,
    ) as IPayload;

    // redis에 로그아웃 토큰 저장 및 만료시간 -> ttl
    await this.cacheManager.set(accessToken, accessToken, {
      ttl: accessExpireAt,
    });
    await this.cacheManager.set(refreshToken, refreshToken, {
      ttl: refreshExpireAt,
    });
  }
}
