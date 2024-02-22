import moment from 'moment';
import { AppLevelDateTimeFormat } from '../../utils';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';

@Entity('product_ratings')
export class ProductRating {
  @PrimaryGeneratedColumn({ name: 'id' })
  public id: number;

  @Column({ name: 'product_id' })
  public productId: number;

  // @Column({ name: 'site_id' }) // deleted from db
  // public siteId: number;

  // @Column({ name: 'vendor_id' })
  // public vendorId: number;

  @Column({ name: 'user_id' })
  public userId: number;

  @Column({ name: 'sub_order_id' })
  public subOrderId: number;

  @Column({ name: 'rating' })
  public rating: string;

  @Column({ name: 'review' })
  public review: string;

  @Column({ name: 'is_active' })
  public isActive: number;

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
