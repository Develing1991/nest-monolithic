import { ApiProperty } from '@nestjs/swagger';

export class UserSignUpInputDto {
  @ApiProperty({
    example: 'useremail@example.com',
  })
  readonly email: string;

  @ApiProperty({
    example: 'Abcd1234!@',
  })
  readonly password: string;

  @ApiProperty({
    example: '홍길동',
  })
  readonly name: string;

  // @ApiProperty({ type: 'string', format: 'binary', required: false })
  // @ApiProperty({
  //   type: 'string',
  //   format: 'binary',
  //   required: false,
  // })
  // readonly profileImageUrl: string;

  //파일 업로드는 따로 분리하기 이미지

  @ApiProperty({
    example: '01012345678',
  })
  readonly phoneNumber: string;

  @ApiProperty({
    example: '12345',
    required: false,
  })
  readonly zipcode: string;

  @ApiProperty({
    example: '서울특별시 강남구 역삼동 123-45',
    required: false,
  })
  readonly address: string;

  @ApiProperty({
    example: 'xxx 아파트 123호',
    required: false,
  })
  readonly addressDetail: string;
}
