import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('category_brand')
export class CategoryBrand {
  @PrimaryGeneratedColumn({ name: 'id' })
  public id: number;

  @Column({ name: 'cat_id' })
  public catId: number;

  @Column({ name: 'brand_id' })
  public brandId: number;

  @Column({ name: 'site_id' })
  public siteId: number;

  @Column({ name: 'sort_order' })
  public sortOrder: string;

  @Column({ name: 'is_active' })
  public isActive: number;
}
