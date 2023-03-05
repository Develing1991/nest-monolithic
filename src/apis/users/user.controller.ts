import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '@src/commons/decorators/currentUser.decorator';
import { Request } from 'express';
import { UserSignUpInputDto } from './dto/signup/userSignup.input.dto';
import { UserEmailInputDto } from './dto/validate/userEmail.input.dto';

import { UserService } from './user.service';

@ApiTags('Users')
@Controller({ path: 'users' })
export class UserController {
  constructor(
    private readonly userService: UserService, //
  ) {}

  @Post()
  @ApiOperation({ summary: '회원가입' })
  // @UseInterceptors(FileInterceptor('file'))
  // @ApiConsumes('multipart/form-data')
  async signup(@Body() userSignUpInputDto: UserSignUpInputDto) {
    return this.userService.signupWithEmail(userSignUpInputDto);
  }

  @Post('/checkDuplicatedEmail')
  @ApiOperation({ summary: '이메일 중복 확인' })
  // @UseInterceptors(FileInterceptor('file'))
  // @ApiConsumes('multipart/form-data')
  checkDuplicatedEmail(@Body() { email }: UserEmailInputDto) {
    return this.userService.checkDuplicatedEmail({ email });
  }

  // 유저 권한 변경

  @Get('/test')
  @ApiBearerAuth()
  @ApiOperation({ summary: '가드테스트' })
  @UseGuards(AuthGuard('access'))
  fetchUser(
    @Req() req: Request, //
    @CurrentUser() user,
  ) {
    // console.log(req.headers);
    console.log('fetchuser되나?');
    return 'fsdfss';
  }

  //   @Get('/')
  //   findUser() {
  //     return this.userService.findUser();
  //   }
}
