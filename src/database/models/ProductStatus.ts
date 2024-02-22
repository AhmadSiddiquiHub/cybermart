import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product_statuses')
export class ProductStatus {
  @PrimaryGeneratedColumn({ name: 'id' })
  public id: number;

  @Column({ name: 'name' })
  public name: string;

  @Column({ name: 'color_code' })
  public colorCode: string;

  @Column({ name: 'is_active' })
  public isActive: number;
}
