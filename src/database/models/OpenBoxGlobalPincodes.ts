import { IsNotEmpty } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Seller } from './Sellers';

@Entity('open_box_global_pincodes')
export class OpenBoxGlobalPincodes {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @ManyToOne(() => Seller, (vendor) => vendor.openBoxGlobalPincodes)
  @IsNotEmpty()
  @JoinColumn({ name: 'vendor_id' })
  public vendorId: number;

  @Column({ name: 'pincode' })
  public pincode: number;
}
