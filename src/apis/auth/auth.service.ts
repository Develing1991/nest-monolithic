import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthSignInOutputDto } from './dto/authSignIn.output.dto';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
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

  async createToken({ user, type, res }) {
    const token = await this.jwtService.sign(
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
      return;
    }
    return token;
  }
}
