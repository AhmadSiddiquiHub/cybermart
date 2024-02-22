import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('vendor_product_categories')
export class VendorProductCategory {
  @PrimaryGeneratedColumn({ name: 'id' })
  public id: number;

  @Column({ name: 'vendor_product_id' })
  public vendorProductId: number;

  @Column({ name: 'category_id' })
  public categoryId: number;
}
