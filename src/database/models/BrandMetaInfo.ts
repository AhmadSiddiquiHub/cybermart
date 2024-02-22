import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('brands_meta_info')
export class BrandMetaInfo {
  @PrimaryGeneratedColumn({ name: 'id' })
  public id: number;

  @Column({ name: 'brand_id' })
  public brandId: number;

  @Column({ name: 'site_id' })
  public siteId: number;

  @Column({ name: 'lang_id' })
  public langId: number;

  @Column({ name: 'meta_title' })
  public metaTitle: string;

  @Column({ name: 'meta_keyword' })
  public metaKeyword: string;

  @Column({ name: 'meta_description' })
  public metaDescription: string;
}
