import { ApiProperty } from '@nestjs/swagger';

export class AuthSignInInputDto {
  @ApiProperty({ example: 'useremail@example.com' })
  readonly email: string;

  @ApiProperty({ example: 'Abcd1234!@' })
  readonly password: string;
}
