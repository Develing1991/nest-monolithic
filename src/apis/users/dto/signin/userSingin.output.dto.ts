import { OmitType } from '@nestjs/swagger';
import { UserSignInInputDto } from './userSingin.input.dto';

export class UserSignInOutputDto extends OmitType(UserSignInInputDto, [
  'password',
]) {
  readonly email: string;
  readonly name: string;
  readonly phoneNumber: string;
  readonly zipcode: string;
  readonly address: string;
  readonly addressDetail: string;
  constructor(data: UserSignInInputDto) {
    super();
    this.email = data.email;
    this.name = data.name;
    this.phoneNumber = data.email;
    this.zipcode = data.zipcode;
    this.address = data.address;
    this.addressDetail = data.addressDetail;
  }
}
