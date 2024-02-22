import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('site_settings')
export class SiteSetting {
  @PrimaryColumn({ name: 'site_id' })
  public siteId: number;

  @PrimaryColumn({ name: 'key_name' })
  public keyName: string;

  @Column({ name: 'value' })
  public value: string;

  // @Column({ name: 'is_active' })
  // public isActive: number;

  @Column({ name: 'description' })
  public description: string;
}
