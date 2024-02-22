import {
  Column,
  Entity,
  BeforeInsert,
  BeforeUpdate,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  // OneToOne
} from 'typeorm';

import moment = require('moment/moment');
import { Campaign } from './Campaign';
import { IsNotEmpty } from 'class-validator';
// import { Product } from './Product';
import { AppLevelDateTimeFormat } from '../../utils';

@Entity('campaign_products')
export class CampaignProducts {
  @IsNotEmpty()
  @PrimaryGeneratedColumn({ name: 'id' })
  public id: number;
  @IsNotEmpty()
  @Column({ name: 'campaign_id' })
  public campaignId: number;

  @Column({ name: 'product_id' })
  public productId: number;

  @Column({ name: 'vendor_id' })
  public vendorId: number;

  @ManyToOne(() => Campaign, (campaign) => campaign.campaignProducts)
  @JoinColumn({ name: 'campaign_id' })
  public campaign: Campaign;

  // @OneToOne(() => Product, (product) => product.campaignProducts)
  // @JoinColumn({ name: 'product_id' })
  // product: Product;

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
