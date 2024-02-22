import moment = require('moment/moment');
import {
  Column,
  Entity,
  BeforeInsert,
  BeforeUpdate,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AppLevelDateTimeFormat } from '../../utils';
@Entity('coupon_users')
export class CouponUser {
  @PrimaryGeneratedColumn({ name: 'id' })
  public id: number;

  @Column({ name: 'coupon_id' })
  public couponId: number;

  @Column({ name: 'user_id' })
  public userId: number;

  @Column({ name: 'site_id' })
  public siteId: number;

  @Column({ name: 'created_at' })
  public createdAt: string;

  @Column({ name: 'updated_at' })
  public updatedAt: string;

  @BeforeInsert()
  public async createDetails(): Promise<void> {
    this.createdAt = moment().format(AppLevelDateTimeFormat);
  }

  @BeforeUpdate()
  public async updateDetails(): Promise<void> {
    this.updatedAt = moment().format(AppLevelDateTimeFormat);
  }
}
