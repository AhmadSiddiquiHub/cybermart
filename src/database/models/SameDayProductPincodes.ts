import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
// import { Product } from './Product';
// import { Seller } from './Sellers';

@Entity('same_day_product_pincodes')
export class SameDayProductPincodes {
  @PrimaryGeneratedColumn({ name: 'id' })
  public id: number;

  @Column({ name: 'vendor_id' })
  public vendorId: number;

  @Column({ name: 'product_id' })
  public product_id: number;

  @Column({ name: 'pincode' })
  public pincode: number;
}
