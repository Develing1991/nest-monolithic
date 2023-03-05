import { OmitType } from '@nestjs/swagger';
import { UserSignUpInputDto } from './userSignup.input.dto';

export class UserSignUpOutputDto extends OmitType(UserSignUpInputDto, [
  'password',
]) {
  readonly email: string;
  readonly name: string;
  readonly phoneNumber: string;
  readonly zipcode: string;
  readonly address: string;
  readonly addressDetail: string;
  constructor(data: UserSignUpInputDto) {
    super();
    this.email = data.email;
    this.name = data.name;
    this.phoneNumber = data.email;
    this.zipcode = data.zipcode;
    this.address = data.address;
    this.addressDetail = data.addressDetail;
  }
}
