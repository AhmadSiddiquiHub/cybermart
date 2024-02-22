import { IsNotEmpty } from 'class-validator';
import moment = require('moment');
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { AppLevelDateTimeFormat } from '../../utils';

@Entity('sub_orders')
export class SubOrder {
  @PrimaryGeneratedColumn({ name: 'id' })
  public id: number;

  @Column({ name: 'site_id' })
  public siteId: number;

  @Column({ name: 'order_id' })
  public orderId: number;

  @Column({ name: 'product_id' })
  public productId: number;

  @Column({ name: 'product_variant_id' })
  public productVariantId: number;

  @Column({ name: 'status_id' })
  public statusId: number;

  @Column({ name: 'status' })
  public status: string;

  @Column({ name: 'status_color' })
  public statusColor: string;

  @Column({ name: 'user_id' })
  public userId: number;

  @IsNotEmpty()
  @Column({ name: 'shipping_charges' })
  public shippingCharges: number;

  @IsNotEmpty()
  @Column({ name: 'shipping_days' })
  public shippingDays: number;

  @IsNotEmpty()
  @Column({ name: 'shipping_type' })
  public shippingType: string;

  @Column({ name: 'vendor_id' })
  public vendorId: number;

  @Column({ name: 'campaign_id' })
  public campaignId: number;

  @Column({ name: 'product_name' })
  public productName: string;

  @Column({ name: 'product_image' })
  public productImage: string;

  @Column({ name: 'product_price' })
  public productPrice: string;

  @Column({ name: 'quantity' })
  public quantity: number;

  @Column({ name: 'total_amount' })
  public totalAmount: string;

  @Column({ name: 'suborder_no' })
  public subOrderNo: string;

  @Column({ name: 'discount' })
  public discount: number;

  // @Column({ name: 'tax' })
  // public tax: number;

  // @Column({ name: 'commission' })
  // public commission: number;

  @Column({ name: 'variant' })
  public variant: string;

  @Column({ name: 'created_at' })
  public createdAt: string;

  @Column({ name: 'updated_at' })
  public updatedAt: string;

  @Column({ name: 'view_return_label' })
  public viewReturnLabel: number;

  @Column({ name: 'return_till_date' })
  public returnTillDate: number;

  @BeforeInsert()
  public async createDetails(): Promise<void> {
    this.createdAt = moment().format(AppLevelDateTimeFormat);
  }

  @BeforeUpdate()
  public async updateDetails(): Promise<void> {
    this.updatedAt = moment().format(AppLevelDateTimeFormat);
  }
}
