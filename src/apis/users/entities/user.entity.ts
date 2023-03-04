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

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50 })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column({ type: 'varchar', length: 50 })
  @IsNotEmpty()
  password: string;

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
