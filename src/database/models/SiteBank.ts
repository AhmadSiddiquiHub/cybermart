import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('site_banks')
export class SiteBank {
  @Column({ name: 'site_id' })
  public siteId: number;

  @PrimaryColumn({ name: 'bank_id' })
  public bankId: number;

  @Column({ name: 'is_active' })
  public isActive: number;
}
