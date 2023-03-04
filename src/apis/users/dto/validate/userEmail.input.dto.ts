import { ApiProperty } from '@nestjs/swagger';

export class UserEmailInputDto {
  @ApiProperty({
    description: 'useremail@example.com',
  })
  readonly email: string;
}
