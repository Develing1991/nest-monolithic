import { ApiProperty } from '@nestjs/swagger';

export class UserEmailInputDto {
  @ApiProperty({
    example: 'useremail@example.com',
  })
  readonly email: string;
}
