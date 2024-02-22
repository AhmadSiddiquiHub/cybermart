import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('order_statuses')
export class OrderStatus {
  @PrimaryGeneratedColumn({ name: 'id' })
  public id: number;

  @Column({ name: 'name' })
  public name: string;

  @Column({ name: 'is_active' })
  public isActive: number;

  @Column({ name: 'color_code' })
  public colorCode: string;
}
