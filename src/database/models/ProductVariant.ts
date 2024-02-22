import moment = require('moment');
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { AppLevelDateTimeFormat } from '../../utils';

@Entity('product_variants')
export class ProductVariant {
  @PrimaryGeneratedColumn({ name: 'id' })
  public id: number;

  @Column({ name: 'product_id' })
  public productId: number;

  @Column({ name: 'product_variant_values_id' })
  public productVariantValuesId: string;

  @Column({ name: 'is_active' })
  public isActive: number;

  @Column({ name: 'created_at' })
  public createdAt: string;

  @Column({ name: 'updated_at' })
  public updatedAt: string;

  @Column({ name: 'magento_id' })
  public magentoId: string;

  @BeforeInsert()
  public async createDetails(): Promise<void> {
    this.createdAt = moment().format(AppLevelDateTimeFormat);
  }

  @BeforeUpdate()
  public async updateDetails(): Promise<void> {
    this.updatedAt = moment().format(AppLevelDateTimeFormat);
  }
}
