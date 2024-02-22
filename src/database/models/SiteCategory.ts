import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('site_categories')
export class SiteCategory {
  @PrimaryColumn({ name: 'site_id' })
  public siteId: string;

  @PrimaryColumn({ name: 'cat_id' })
  public catId: string;

  @Column({ name: 'show_in_menu' })
  public showInMenu: number;

  @Column({ name: 'is_active' })
  public isActive: number;

  @Column({ name: 'featured' })
  public featured: number;

  @Column({ name: 'top_of_month' })
  public topOfMonth: number;
}
