import { Body, Controller, Param, Post, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
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
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  async signup(@Body() userSignUpInputDto: UserSignUpInputDto) {
    return this.userService.signup(userSignUpInputDto);
  }

  @Post('/checkDuplicatedEmail')
  @ApiOperation({ summary: '이메일 중복 확인' })
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  checkDuplicatedEmail(@Body() { email }: UserEmailInputDto) {
    console.log(email);

    return this.userService.checkDuplicatedEmail({ email });
  }

  //   @Get('/')
  //   findUser() {
  //     return this.userService.findUser();
  //   }
}
