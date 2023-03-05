import {
  Body,
  CACHE_MANAGER,
  Controller,
  Get,
  Inject,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '@src/commons/decorators/currentUser.decorator';
import { Request, Response } from 'express';
import { UserService } from '../users/user.service';
import { AuthService } from './auth.service';
import { AuthSignInInputDto } from './dto/authSignIn.input.dto';

interface IGoogleUser {
  email: string;
  name: string;
  picture: string;
  password: string;
}

@ApiTags('Auth')
@Controller({ path: '' })
export class AuthController {
  constructor(
    private readonly authService: AuthService, //
    private readonly userService: UserService,
  ) {}

  @Post('/login')
  @ApiOperation({ summary: '로그인' })
  // @UseInterceptors(FileInterceptor('file'))
  // @ApiConsumes('multipart/form-data')
  async login(
    @Body() { email, password }: AuthSignInInputDto,
    @Res() res: Response,
  ) {
    const user = await this.userService.findUser({ email });
    const result = await this.authService.login({ user, password, res });
    res.send(result);
  }

  @Get('/login/google')
  @UseGuards(AuthGuard('google'))
  async loginGoogle(
    @Req() req: Request, //
    @Res() res: Response,
  ) {
    const { email, ...rest } = req.user as IGoogleUser;
    // 유저조회
    let user = await this.userService.findUser({ email });
    // 회원가입 처리
    if (!user) {
      user = await this.userService.signupWithGoogle({
        email,
        ...rest,
      });
    }
    // 리프레시만 발급
    this.authService.setRefreshToken({ user, res });
    res.redirect('http://localhost:5500/front/test2.html');
  }

  @Post('/refreshAccessToken')
  @ApiOperation({ summary: '토큰 재발급' })
  @UseGuards(AuthGuard('refresh'))
  async restoreAccessToken(@CurrentUser() user) {
    return await this.authService.getAccessToken({ user });
  }

  @Post('/logout')
  @ApiBearerAuth()
  async logout(
    @Req() req: Request, //
  ) {
    this.authService.logout({ req });
  }
}
