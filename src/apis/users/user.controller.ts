import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CurrentUser } from '@src/commons/decorators/currentUser.decorator';
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

  @Get('/test')
  @UseGuards(AuthGuard('myGuard'))
  @ApiBearerAuth()
  @ApiOperation({ summary: '가드테스트' })
  fetchUser(@CurrentUser() user) {
    console.log(user);

    console.log('fetchuser되나?');
    return 'fsdfss';
  }

  //   @Get('/')
  //   findUser() {
  //     return this.userService.findUser();
  //   }
}
