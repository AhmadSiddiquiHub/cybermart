import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product_shipping_info')
export class ProductShippingInfo {
  @PrimaryGeneratedColumn({ name: 'id' })
  public id: number;

  @Column({ name: 'product_id' })
  public productId: number;

  @Column({ name: 'vendor_id' })
  public vendorId: number;

  @Column({ name: 'site_id' })
  public siteId: number;

  @Column({ name: 'days' })
  public days: number;

  @Column({ name: 'charges' })
  public charges: number;

  @Column({ name: 'charges_2' })
  public charges2: string;

  @Column({ name: 'type' })
  public type: string;
}
