import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { Campaign } from './Campaign';

@Entity('campaign_packages')
export class CampaignPackage {
  @IsNotEmpty()
  @PrimaryGeneratedColumn({ name: 'id' })
  public id: number;

  @Column({ name: 'name' })
  public name: string;

  @OneToOne(() => Campaign, (campaign) => campaign.campaignPackage)
  @JoinColumn({ name: 'id' })
  campaign: Campaign;
}
