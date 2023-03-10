import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { IsEmail, IsNotEmpty } from 'class-validator';
import { UserProfile } from './userProfile.entity';
import { Favorite } from '@src/apis/favorites/entities/favorite.entity';
import { Order } from '@src/apis/orders/entities/order.entity';

export enum UserRole {
  ADMIN = 'admin',
  CUSTOMER = 'customer',
  SELLER = 'seller',
}
export enum UserProvider {
  EMAIL = 'email',
  GOOGLE = 'google',
  NAVER = 'naver',
  KAKAO = 'kakao',
}
export enum UserProviderPhoneNumber {
  EMAIL = 'email',
  GOOGLE = '01000000001',
  NAVER = '01000000002',
  KAKAO = '01000000003',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50 })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column({ type: 'varchar', length: 200 })
  @IsNotEmpty()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.CUSTOMER,
  })
  userRole: string;

  @Column({
    type: 'enum',
    enum: UserProvider,
    default: UserProvider.EMAIL,
  })
  provider: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => UserProfile, (userProfile) => userProfile.user)
  userProfile: UserProfile;

  @OneToMany(() => Favorite, (favorite) => favorite.user)
  favorites: Favorite[];

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
