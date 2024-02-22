import { Column, Entity, PrimaryColumn } from 'typeorm';
@Entity('product_measurements')
export class ProductMeasurement {
  @PrimaryColumn({ name: 'product_id' })
  public productId: number;

  @Column({ name: 'length' })
  public length: number;

  @Column({ name: 'breadth' })
  public breadth: number;

  @Column({ name: 'height' })
  public height: number;

  @Column({ name: 'weight' })
  public weight: number;
}
