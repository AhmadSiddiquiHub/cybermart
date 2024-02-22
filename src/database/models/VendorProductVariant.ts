import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('vendor_product_variants')
export class VendorProductVariant {
  @PrimaryGeneratedColumn({ name: 'id' })
  public id: number;

  @Column({ name: 'vendor_id' })
  public vendorId: number;

  @Column({ name: 'site_id' })
  public siteId: number;

  @Column({ name: 'product_id' })
  public productId: number;

  @Column({ name: 'product_variant_id' })
  public productVariantId: number;

  @Column({ name: 'price' })
  public price: string;

  @Column({ name: 'sku' })
  public sku: string;

  @Column({ name: 'is_active' })
  public isActive: number;

  @Column({ name: 'available' })
  public available: number;

  @Column({ name: 'quantity' })
  public quantity: number;

  @Column({ name: 'is_featured' })
  public isFeatured: number;

  @Column({ name: 'out_of_stock' })
  public outOfStock: number;

  @Column({ name: 'price_2' })
  public price2: string;

  @Column({ name: 'is_default', default: false })
  public is_default: boolean;
}
