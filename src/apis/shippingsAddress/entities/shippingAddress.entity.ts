import { Order } from '@src/apis/orders/entities/order.entity';
import { IsNotEmpty } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class ShippingAddress {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsNotEmpty()
  receiverName: string;

  @Column()
  @IsNotEmpty()
  receiverPhone: string;

  @Column()
  @IsNotEmpty()
  receiverAddress: string;

  @Column()
  @IsNotEmpty()
  receiverAddressDetail: string;

  @Column()
  receiverMessage: string;

  @Column()
  zipcode: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Order, (order) => order.shippingAddresses)
  order: Order;
}
