import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
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
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  async signin(@Body() { email, password }: AuthSignInInputDto) {
    const user = await this.userService.findUser({ email });

    return this.authService.login({ user, password });
  }
}
