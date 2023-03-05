import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

import * as TypeOrmConfig from '@src/conf/typeorm.config';
import { UserModule } from './apis/users/user.module';
import { AuthModule } from './apis/auth/auth.module';
import { JwtAccessStrategy } from './commons/strategies/jwt-access.strategy';
import { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    UserModule, //
    AuthModule,

    TypeOrmModule.forRoot({
      ...TypeOrmConfig,
      entities: [__dirname + '/apis/**/*.entity.*'],
    }),
    CacheModule.register<RedisClientOptions>({
      store: redisStore,
      url: 'redis://dev-redis:6379',
      isGlobal: true,
    }),
  ],
  providers: [JwtAccessStrategy],
})
export class AppModule {}
