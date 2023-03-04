import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthSignInOutputDto } from './dto/authSignIn.output.dto';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
  async login({ user, password }) {
    // 회원 검증
    await this.exactUser({ password, user });

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

  // 토큰
  getAccessToken({ user }) {
    const accessToken = this.jwtService.sign(
      {
        email: user.email, //
        sub: user.id,
      },
      {
        secret: process.env.ACCESSTK_SKEY,
        expiresIn: process.env.ACCESSTK_EXPR,
      },
    );
    return new AuthSignInOutputDto(accessToken, '');
  }
}
