import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('site_brands')
export class SiteBrand {
  @PrimaryGeneratedColumn({ name: 'id' })
  public id: number;

  @Column({ name: 'site_id' })
  public siteId: number;

  @Column({ name: 'brand_id' })
  public brandId: number;

  @Column({ name: 'is_featured' })
  public isFeatured: number;

  @Column({ name: 'is_active' })
  public isActive: number;

  @Column({ name: 'brand_page_banner_image' })
  public brandPageBannerImage: number;
}
