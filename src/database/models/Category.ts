import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn({ name: 'id' })
  public id: number;

  @Column({ name: 'parent' })
  public parentInt: number;

  @Column({ name: 'sort_order' })
  public sortOrder: number;

  @Column({ name: 'url_key' })
  public urlKey: string;

  @Column({ name: 'image' })
  public image: string;

  @Column({ name: 'icon' })
  public icon: string;

  @Column({ name: 'size_chart_image_required' })
  public sizeChartImageRequired: number;
}
