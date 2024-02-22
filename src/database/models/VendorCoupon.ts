import {
  Column,
  Entity,
  BeforeInsert,
  BeforeUpdate,
  PrimaryGeneratedColumn,
} from 'typeorm';
import moment = require('moment/moment');
import { AppLevelDateTimeFormat } from '../../utils';

@Entity('coupon')
export class VendorCoupon {
  @PrimaryGeneratedColumn({ name: 'id' })
  public vendorCouponId: number;

  @Column({ name: 'vendor_id' })
  public vendorId: number;

  @Column({ name: 'coupon_name' })
  public couponName: string;

  @Column({ name: 'coupon_code' })
  public couponCode: string;

  @Column({ name: 'coupon_type' }) // 1-> percentage 2 -> amount
  public couponType: number;

  @Column({ name: 'value' })
  public value: number;

  @Column({ name: 'coupon_description' })
  public couponDescription: string;

  @Column({ name: 'max_usage' })
  public maxUsage: number;

  @Column({ name: 'start_date' })
  public startDate: string;

  @Column({ name: 'end_date' })
  public endDate: string;

  @Column({ name: 'is_active' })
  public isActive: number;

  @Column({ name: 'created_at' })
  public createdAt: string;

  @Column({ name: 'updated_at' })
  public updatedAt: string;

  @Column({ name: 'user_id' })
  public userId: number;

  @BeforeInsert()
  public async createDetails(): Promise<void> {
    this.createdAt = moment().format(AppLevelDateTimeFormat);
  }
  @BeforeUpdate()
  public async updateDetails(): Promise<void> {
    this.updatedAt = moment().format(AppLevelDateTimeFormat);
  }
}
