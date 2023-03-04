import { User } from '@src/apis/users/entities/user.entity';
import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { FavoriteProduct } from './favoriteProduct.entity';

@Entity()
export class Favorite {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.favorites)
  user: User;

  @OneToMany(
    () => FavoriteProduct,
    (favoriteProduct) => favoriteProduct.favorite,
  )
  favoriteProducts: FavoriteProduct[];
}
