import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

import * as TypeOrmConfig from '@src/conf/typeorm.config';
import { UserModule } from './apis/users/user.module';
import { AuthModule } from './apis/auth/auth.module';
import { JwtAccessStrategy } from './commons/strategies/jwt-access.strategy';
import { JwtRefreshStrategy } from './commons/strategies/jwt-refresh.strategy';

@Module({
  imports: [
    UserModule, //
    AuthModule,

    TypeOrmModule.forRoot({
      ...TypeOrmConfig,
      entities: [__dirname + '/apis/**/*.entity.*'],
    }),
  ],
  providers: [JwtAccessStrategy, JwtRefreshStrategy],
})
export class AppModule {}
