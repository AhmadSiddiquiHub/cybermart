import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('brands')
export class Brand {
  @PrimaryGeneratedColumn({ name: 'id' })
  public id: number;

  @Column({ name: 'name' })
  public name: string;

  @Column({ name: 'image' })
  public image: string;

  @Column({ name: 'slug' })
  public slug: string;

  @Column({ name: 'is_active' })
  public isActive: number;
}
