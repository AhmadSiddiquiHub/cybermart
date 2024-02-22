import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product_variant_images')
export class ProductVariantImage {
  @PrimaryGeneratedColumn({ name: 'id' })
  public id: number;

  @Column({ name: 'image' })
  public image: string;

  @Column({ name: 'is_active' })
  public isActive: number;

  @Column({ name: 'is_default' })
  public isDefault: number;

  @Column({ name: 'product_variants_id' })
  public productVariantsId: number;

  @Column({ name: 'variant_id' })
  public variantId: number;
}
