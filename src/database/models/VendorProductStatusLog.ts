import moment from 'moment';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AppLevelDateTimeFormat } from '../../utils';

@Entity('vendor_product_status_logs')
export class VendorProductStatusLog {
  @PrimaryGeneratedColumn({ name: 'id' })
  public id: number;

  @Column({ name: 'product_id' })
  public productId: number;

  @Column({ name: 'vendor_id' })
  public vendorId: number;

  @Column({ name: 'updated_by' })
  public updatedBy: number;

  @Column({ name: 'product_status' })
  public productStatus: number;

  @Column({ name: 'comments' })
  public comments: string;

  @Column({ name: 'created_at' })
  public createdAt: string;

  @BeforeInsert()
  public async createDetails(): Promise<void> {
    this.createdAt = moment().format(AppLevelDateTimeFormat);
  }
}
