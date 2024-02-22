import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  // ManyToOne,
  //  JoinColumn
} from 'typeorm';
// import { Vendor } from './Vendor';
// import { CampaignUsage } from './CampaignUsage';
import { IsNotEmpty } from 'class-validator';
// import { CampaignUsers } from './CampaignUsers';
import { CampaignVendors } from './CampaignVendors';
import { CampaignProducts } from './CampaignProducts';
import { CampaignPackage } from './CampaignPackages';
// import { Users } from './Users';
@Entity('campaign')
export class Campaign {
  @IsNotEmpty()
  @PrimaryGeneratedColumn({ name: 'id' })
  public id: number;

  @IsNotEmpty()
  @Column({ name: 'campaign_name' })
  public campaignName: string;

  @Column({ name: 'start_date' })
  public startDate: string;

  @Column({ name: 'main_page_banner' })
  public mainPageBanner: string;

  @Column({ name: 'vendor_reg_banner' })
  public vendorRegBanner: string;

  @Column({ name: 'end_date' })
  public endDate: string;

  @Column({ name: 'site_id' })
  public siteId: number;

  @Column({ name: 'status' })
  public status: string;

  @Column({ name: 'slug' })
  public slug: string;

  @Column({ name: 'is_active' })
  public isActive: number;

  @Column({ name: 'meta_title' })
  public metaTitle: string;

  @Column({ name: 'meta_keyword' })
  public metaKeyword: string;

  @Column({ name: 'meta_description' })
  public metaDescription: string;

  // @OneToMany(type => CampaignUsers, campaignUsers => campaignUsers.campaign)
  // public campaignUsers: CampaignUsers[];

  @OneToMany(
    () => CampaignVendors,
    (campaignVendors) => campaignVendors.campaign,
  )
  public campaignVendors: CampaignVendors[];

  @OneToMany(
    () => CampaignProducts,
    (campaignProducts) => campaignProducts.campaign,
  )
  public campaignProducts: CampaignProducts[];

  @OneToOne(
    () => CampaignPackage,
    (campaignPackage) => campaignPackage.campaign,
  )
  public campaignPackage: CampaignPackage[];

  // @ManyToOne(type => Users, users => users.campaign)
  // @JoinColumn({ name: 'vendor_id' })
  // public users: Users;

  // id	campaign_name	slug	status	start_date	end_date	is_active
}
