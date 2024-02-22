import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('products_meta_info')
export class ProductMetaInfo {
  @PrimaryGeneratedColumn({ name: 'id' })
  public id: number;

  @Column({ name: 'product_id' })
  public productId: number;

  @Column({ name: 'site_id' })
  public siteId: number;

  @Column({ name: 'lang_id' })
  public langId: number;

  @Column({ name: 'title' })
  public title: string;

  @Column({ name: 'description' })
  public description: string;

  @Column({ name: 'keyword' })
  public keyword: string;
}
