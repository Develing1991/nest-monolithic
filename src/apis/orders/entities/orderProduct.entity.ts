import { Product } from '@src/apis/products/entities/product.entity';
import { IsNotEmpty, Min } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Order } from './order.entity';

@Entity()
export class OrderProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsNotEmpty()
  @Min(1)
  quantity: number;

  @Column()
  @IsNotEmpty()
  @Min(1)
  price: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Product, (product) => product.orderProducts)
  product: Product;

  @ManyToOne(() => Order, (order) => order.orderProducts)
  order: Order;
}
