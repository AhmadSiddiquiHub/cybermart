import moment = require('moment');
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { AppLevelDateTimeFormat } from '../../utils';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn({ name: 'id' })
  public orderId: number;

  @Column({ name: 'user_id' })
  public userId: number;

  @Column({ name: 'site_id' })
  public siteId: number;

  @Column({ name: 'country_id' })
  public countryId: number;

  @Column({ name: 'state_id' })
  public stateId: number;

  @Column({ name: 'city_id' })
  public cityId: number;

  @Column({ name: 'area_id' })
  public areaId: number;

  @Column({ name: 'name' })
  public name: string;

  @Column({ name: 'phone_no' })
  public phoneNo: string;

  @Column({ name: 'tax' })
  public tax: string;

  @Column({ name: 'line_addr_1' })
  public lineAddress1: string;

  @Column({ name: 'line_addr_2' })
  public lineAddress2: string;

  @Column({ name: 'line_addr_3' })
  public lineAddress3: string;

  @Column({ name: 'zipcode' })
  public zipcode: string;

  @Column({ name: 'addr_type' })
  public addrType: string;

  @Column({ name: 'status_id' })
  public statusId: number;

  @Column({ name: 'order_no' })
  public orderNo: string;

  @Column({ name: 'total_amount' })
  public totalAmount: string;

  @Column({ name: 'payment_method_id' })
  public paymentMethodId: number;

  @Column({ name: 'payment_status' })
  public paymentStatus: number;

  @Column({ name: 'comments' })
  public comments: string;

  @Column({ name: 'coupon' })
  public coupon: string;

  @Column({ name: 'discount' })
  public discount: number;

  @Column({ name: 'created_at' })
  public createdAt: string;

  @Column({ name: 'updated_at' })
  public updatedAt: string;

  @Column({ name: 'invoice' })
  public invoice: string;

  @Column({ name: 'tracking_slip' })
  public trackingSlip: string;

  @Column({ name: 'shipping_charges' })
  public shippingCharges: string;

  @BeforeInsert()
  public async createDetails(): Promise<void> {
    this.createdAt = moment().format(AppLevelDateTimeFormat);
  }

  @BeforeUpdate()
  public async updateDetails(): Promise<void> {
    this.updatedAt = moment().format(AppLevelDateTimeFormat);
  }
}
