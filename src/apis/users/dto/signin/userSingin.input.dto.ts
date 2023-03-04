import { ApiProperty } from '@nestjs/swagger';

export class UserSignInInputDto {
  @ApiProperty({
    description: 'useremail@example.com',
  })
  readonly email: string;

  @ApiProperty({
    description: 'Abcd1234!@',
  })
  readonly password: string;

  @ApiProperty({
    description: '홍길동',
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
    description: '01012345678',
  })
  readonly phoneNumber: string;

  @ApiProperty({
    description: '12345',
    required: false,
  })
  readonly zipcode: string;

  @ApiProperty({
    description: '서울특별시 강남구 역삼동 123-45',
    required: false,
  })
  readonly address: string;

  @ApiProperty({
    description: 'xxx 아파트 123호',
    required: false,
  })
  readonly addressDetail: string;
}
