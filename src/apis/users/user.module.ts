import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserAddress } from './entities/userAddress.entity';
import { UserProfile } from './entities/userProfile.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserAddress, UserProfile])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
