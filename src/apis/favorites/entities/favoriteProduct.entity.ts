import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Favorite } from './favorite.entity';
import { Product } from '@src/apis/products/entities/product.entity';

@Entity()
export class FavoriteProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Favorite, (favorite) => favorite.favoriteProducts)
  favorite: Favorite;

  @ManyToOne(() => Product, (product) => product.favoriteProducts)
  product: Product;
}
