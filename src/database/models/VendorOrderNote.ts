import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('vendor_order_notes')
export class VendorOrderNote {
  @PrimaryGeneratedColumn({ name: 'id' })
  public id: number;

  @Column({ name: 'order_id' })
  public orderId: number;

  @Column({ name: 'vendor_id' })
  public vendorId: number;

  @Column({ name: 'comments' })
  public comments: string;
}
