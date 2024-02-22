import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('open_box_product_pincodes')
export class OpenBoxProductPincodes {
  @PrimaryGeneratedColumn({ name: 'id' })
  public id: number;

  @Column({ name: 'vendor_id' })
  public vendorId: number;

  @Column({ name: 'product_id' })
  public productId: number;

  @Column({ name: 'pincode' })
  public pincode: number;
}
