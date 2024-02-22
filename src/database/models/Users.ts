import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import moment = require('moment');
import { AppLevelDateTimeFormat } from '../../utils';
import { UserAddresses } from './UserAddresses';
import { CampaignVendors } from './CampaignVendors';

@Entity('users')
export class Users {
  @IsNotEmpty()
  @PrimaryGeneratedColumn({ name: 'id' })
  public userId: number;

  @Column({ name: 'site_id' })
  public siteId: number;

  @IsNotEmpty()
  @Column({ name: 'type_id' })
  public typeId: string;

  @IsNotEmpty()
  @Column({ name: 'role_id' })
  public roleId: number;

  @IsNotEmpty()
  @Column({ name: 'first_name' })
  public firstName: string;

  @Column({ name: 'last_name' })
  public lastName: string;

  @Column({ name: 'Date_of_birth' })
  public dateOfBirth: string;

  @Column({ name: 'email' })
  public email: string;

  @IsNotEmpty()
  @Column({ name: 'password' })
  public password: string;

  @Column({ name: 'country_of_birth' })
  public countryOfBirth: number;
  @Column({ name: 'country_of_citizenship' })
  public countryOfCitizenship: number;

  @IsNotEmpty()
  @Column({ name: 'created_at' })
  public createdAt: string;

  @Column({ name: 'updated_at' })
  public updatedAt: string;

  @Column({ name: 'is_locked' })
  public isLocked: number;

  @Column({ name: 'locked_at' })
  public lockedAt: Date;

  @Column({ name: 'wallet_bal' })
  public walletBal: number;

  @Column({ name: 'save_brows_hist' })
  public saveBrowsHist: number;

  @IsNotEmpty()
  @Column({ name: 'is_active' })
  public isActive: number;

  @Column({ name: 'avatar' })
  public avatar: string;

  @Column({ name: 'path' })
  public path: string;

  @Column({ name: 'mobile_number' })
  public mobileNumber: string;

  @Column({ name: 'email_verified' })
  public emailVerified: number;

  @Column({ name: 'mobile_verified' })
  public mobileVerified: number;

  @Column({ name: 'socket_id' })
  public socketId: string;

  @Column({ name: 'magento_seller_id' })
  public magentoSellerId: number;

  @Column({ name: 'magento_user_id' })
  public magentoUserId: number;

  @Column({ name: 'is_cybermart_seller' })
  public isCybermartSeller: number;

  // @Column({ name: 'vendor_profile_completed'}) //deleted from db
  // public vendorProfileCompleted: number;

  @Column({ name: 'login_type' })
  public lType: string;

  @Column({ name: 'parent_id' })
  public parentId: number;

  @OneToMany(
    () => CampaignVendors,
    (campaignVendors) => campaignVendors.vendors,
  )
  public campaignVendors: CampaignVendors[];

  @OneToMany(() => UserAddresses, (ua) => ua.users)
  public useradd: UserAddresses[];

  @BeforeInsert()
  public async createDetails(): Promise<void> {
    this.createdAt = moment().format(AppLevelDateTimeFormat);
  }

  @BeforeUpdate()
  public async updateDetails(): Promise<void> {
    this.updatedAt = moment().format(AppLevelDateTimeFormat);
  }
}
