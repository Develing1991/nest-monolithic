import { ApiProperty } from '@nestjs/swagger';

export class AuthSignInInputDto {
  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly password: string;
}
