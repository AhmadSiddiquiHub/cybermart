import moment = require('moment');
import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import { AppLevelDateTimeFormat } from '../../utils';

@Entity('sub_order_logs')
export class SubOrderLog {
  @PrimaryGeneratedColumn({ name: 'id' })
  public id: number;

  @Column({ name: 'sub_order_id' })
  public subOrderId: number;

  @Column({ name: 'status_id' })
  public statusId: number;

  @Column({ name: 'created_at' })
  public createdAt: string;

  @Column({ name: 'reason' })
  public reason: string;

  @Column({ name: 'description' })
  public description: string;

  @BeforeInsert()
  public async createDetails(): Promise<void> {
    this.createdAt = moment().format(AppLevelDateTimeFormat);
  }
}
