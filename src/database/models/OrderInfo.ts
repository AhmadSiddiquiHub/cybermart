import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('order_info')
export class OrderInfo {
  @PrimaryGeneratedColumn({ name: 'id' })
  public id: number;

  @Column({ name: 'order_id' })
  public orderId: number;

  @Column({ name: 'vendor_id' })
  public vendorId: number;

  @Column({ name: 'sub_order_id' })
  public subOrderId: number;

  @Column({ name: 'product_id' })
  public productId: number;

  @Column({ name: 'shipping_charges' })
  public shippingCharges: number;

  @Column({ name: 'shipping_days' })
  public shippingDays: number;

  @Column({ name: 'shipping_type' })
  public shippingType: string;
}
