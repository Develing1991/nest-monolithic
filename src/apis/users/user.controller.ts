import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

import { UserSignInInputDto } from './dto/signin/userSingin.input.dto';

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
  async signin(@Body() userSignInInputDto: UserSignInInputDto) {
    return this.userService.signin(userSignInInputDto);
  }

  @Post('/checkDuplicatedEmail')
  @ApiOperation({ summary: '이메일 중복 확인' })
  @ApiParam({
    name: 'email',
    description: 'useremail@example.com',
  })
  checkDuplicatedEmail(@Param('email') email: string) {
    return this.userService.checkDuplicatedEmail({ email });
  }

  @Get('/')
  finduser() {
    return this.userService.finduser();
  }
}
