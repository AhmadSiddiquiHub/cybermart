import { IsNotEmpty } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Seller } from './Sellers';

@Entity('same_day_global_pincodes')
export class SameDayGlobalPincodes {
  @PrimaryGeneratedColumn({ name: 'id' })
  public id: number;

  @ManyToOne(() => Seller, (vendor) => vendor.sameDayGlobalPincodes)
  @IsNotEmpty()
  @JoinColumn({ name: 'vendor_id' })
  public vendorId: number;

  @Column({ name: 'pincode' })
  @IsNotEmpty()
  public pincode: number;
}
