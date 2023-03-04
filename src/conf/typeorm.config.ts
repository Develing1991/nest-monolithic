import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

module.exports = {
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE_NAME,
  //entities: [__dirname + '/apis/**/entities/*.entity.js'],
  synchronize: true,
  logging: true,
  namingStrategy: new SnakeNamingStrategy(),
};
