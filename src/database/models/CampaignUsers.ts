// import { Column, Entity, BeforeInsert, BeforeUpdate, PrimaryGeneratedColumn, ManyToOne, JoinColumn /*OneToMany */} from 'typeorm';
// import moment = require('moment/moment');
// // import { Order } from './Order';
// import { Campaign } from './Campaign';
// // import { CampaignUsageProduct } from './CampaignUsageProduct';
// import { IsNotEmpty } from 'class-validator';
// // import { Users } from './Users';
// import { AppLevelDateTimeFormat } from '../../utils';
// @Entity('campaign_users')
// export class CampaignUsers {
//     @IsNotEmpty()
//     @PrimaryGeneratedColumn({ name: 'id' })
//     public id: number;
//     @IsNotEmpty()
//     @Column({ name: 'campaign_id' })
//     public campaignId: number;

//     @Column({ name: 'user_id' })
//     public userId: number;

//     @Column({ name: 'site_id' })
//     public siteId: number;

//     @ManyToOne(type => Campaign, campaign => campaign.campaignUsers)
//     @JoinColumn({ name: 'campaign_id' })
//     public campaign: Campaign[];

//     // @ManyToOne(type => Users, users => users.campaignUsers)
//     // @JoinColumn({ name: 'user_id' })
//     // public users: Users[];

//     @Column({ name: 'created_at' })
//     public createdAt: string;

//     @Column({ name: 'updated_at' })
//     public updatedAt: string;

//     @BeforeInsert()
//     public async createDetails(): Promise<void> {
//         this.createdAt = moment().format(AppLevelDateTimeFormat);
//     }

//     @BeforeUpdate()
//     public async updateDetails(): Promise<void> {
//         this.updatedAt = moment().format(AppLevelDateTimeFormat);
//     }
// }
