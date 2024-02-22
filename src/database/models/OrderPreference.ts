import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('order_preferences')
export class OrderPreference {
  @PrimaryGeneratedColumn({ name: 'id' })
  public id: number;

  @Column({ name: 'col' })
  public col: string;

  @Column({ name: 'col_name' })
  public colName: string;

  @Column({ name: 'col_type' })
  public colType: string;

  @Column({ name: 'mandatory' })
  public mandatory: number;

  @Column({ name: 'is_active' })
  public isActive: number;

  @Column({ name: 'sort_by' })
  public sortBy: number;
}
