import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtRefreshStrategy } from '@src/commons/strategies/jwt-refresh.strategy';
import { User } from '../users/entities/user.entity';
import { UserAddress } from '../users/entities/userAddress.entity';
import { UserProfile } from '../users/entities/userProfile.entity';
import { UserService } from '../users/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.register({}), //
    TypeOrmModule.forFeature([User, UserAddress, UserProfile]),
  ],
  controllers: [AuthController],
  providers: [UserService, AuthService, JwtRefreshStrategy],
})
export class AuthModule {}
