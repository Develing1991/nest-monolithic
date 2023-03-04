import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

import * as TypeOrmConfig from '@src/conf/typeorm.config';
import { UserModule } from './apis/users/user.module';
import { AuthModule } from './apis/auth/auth.module';

@Module({
  imports: [
    UserModule, //
    AuthModule,

    TypeOrmModule.forRoot({
      ...TypeOrmConfig,
      entities: [__dirname + '/apis/**/*.entity.*'],
    }),
  ],
})
export class AppModule {}
