import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserAddress } from './entities/userAddress.entity';
import { UserProfile } from './entities/userProfile.entity';
import * as bcrypt from 'bcrypt';

import { UserSignUpOutputDto } from './dto/signup/userSignup.output.dto';
import { UserSignUpInputDto } from './dto/signup/userSignup.input.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserAddress)
    private readonly userAddressRepository: Repository<UserAddress>,
    @InjectRepository(UserProfile)
    private readonly userProfileRepository: Repository<UserProfile>,
  ) {}

  async findUser({ email }) {
    return await this.userRepository.findOne({
      where: { email },
    });
  }

  // 트랜잭션 추가하기 ----
  async signup(userSignUpInputDto: UserSignUpInputDto) {
    const {
      email,
      name,
      phoneNumber,
      password,
      zipcode,
      address,
      addressDetail,
    } = userSignUpInputDto;

    // 유효성 검사
    this.checkValidateEmail({ email });
    this.checkValidatePassword({ password });
    this.checkValidatePhoneNumber({ phoneNumber });
    await this.checkDuplicatedEmail({ email });

    // 패스워드 해싱
    const hashedPassword = await this.hashingPassword(password);

    const user = await this.userRepository.save({
      email,
      password: hashedPassword,
    });

    // create -> save
    const userProfile = await this.userProfileRepository.save({
      user,
      name,
      //   profileImageUrl: '',
      phoneNumber,
    });

    const userAddress = await this.userAddressRepository.save({
      userProfile,
      zipcode,
      address,
      addressDetail,
    });

    return new UserSignUpOutputDto(userSignUpInputDto);
  }

  // 패스워드 해싱
  async hashingPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }

  // 중복 이메일 검증
  async checkDuplicatedEmail({ email }) {
    const user = await this.userRepository.findOne({
      where: { email },
    });
    if (user) {
      throw new ConflictException('이미 등록된 유저입니다.');
    }
  }

  // 이메일 형식 검증
  checkValidateEmail({ email }) {
    const regexp = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
    if (!regexp.test(email)) {
      throw new BadRequestException('이메일 형식이 올바르지 않습니다.');
    }
  }

  // 패스워드 형식 검증
  checkValidatePassword({ password }) {
    const regexp = new RegExp(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{10,20}$/,
    );
    if (!regexp.test(password)) {
      throw new BadRequestException('비밀번호 형식이 올바르지 않습니다.');
    }
  }

  // 휴대폰 번호 형식 검증
  checkValidatePhoneNumber({ phoneNumber }) {
    const regexp = new RegExp(
      /^(?:(010\d{4})|(070\d{4})|(01[1|6|7|8|9]\d{3,4}))(\d{4})$/,
    );
    if (!regexp.test(phoneNumber)) {
      throw new BadRequestException('휴대폰번호 형식이 올바르지 않습니다.');
    }
  }
}
