import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '@src/commons/decorators/currentUser.decorator';
import { Response } from 'express';
import { UserService } from '../users/user.service';
import { AuthService } from './auth.service';
import { AuthSignInInputDto } from './dto/authSignIn.input.dto';

@ApiTags('Auth')
@Controller({ path: '' })
export class AuthController {
  constructor(
    private readonly authService: AuthService, //
    private readonly userService: UserService, //
  ) {}

  @Post('/login')
  @ApiOperation({ summary: '로그인' })
  // @UseInterceptors(FileInterceptor('file'))
  // @ApiConsumes('multipart/form-data')
  async signin(
    @Body() { email, password }: AuthSignInInputDto,
    @Res() res: Response,
  ) {
    const user = await this.userService.findUser({ email });
    const result = await this.authService.login({ user, password, res });
    res.send(result);
  }

  @Post('/refreshAccessToken')
  @ApiOperation({ summary: '토큰 재발급' })
  @UseGuards(AuthGuard('refresh'))
  async restoreAccessToken(@CurrentUser() user) {
    return await this.authService.getAccessToken({ user });
  }
}
