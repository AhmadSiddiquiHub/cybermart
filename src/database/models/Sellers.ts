import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { OpenBoxGlobalPincodes } from './OpenBoxGlobalPincodes';
import { SameDayGlobalPincodes } from './SameDayGlobalPincodes';
import { OpenBoxProductPincodes } from './OpenBoxProductPincodes';
import { SameDayProductPincodes } from './SameDayProductPincodes';

@Entity('vendors')
export class Seller {
  @PrimaryColumn({ name: 'user_id' })
  public userId: number;

  @Column({ name: 'is_profile_completed' })
  public isProfileCompleted: string;

  @Column({ name: 'status_id' })
  public statusId: string;

  @Column({ name: 'account_health' })
  public accountHealth: string;

  @Column({ name: 'product_auto_approval' })
  public productAutoApproval: number;

  @Column({ name: 'rating_count_star1' })
  public OneStartRatingCount: number;

  @Column({ name: 'rating_count_star2' })
  public TwoStartRatingCount: number;

  @Column({ name: 'rating_count_star3' })
  public ThreeStartRatingCount: number;

  @Column({ name: 'rating_count_star4' })
  public FourStartRatingCount: number;

  @Column({ name: 'rating_count_star5' })
  public FiveStartRatingCount: number;

  @Column({ name: 'bucket_path' })
  public bucketPath: string;

  @Column({ name: 'can_add_free_ship' })
  public canAddFreeShip: number;

  @Column({ name: 'same_day_active', default: 0 })
  public sameDayActive: number;

  @Column({ name: 'open_box_active', default: 0 })
  public openBoxActive: number;

  @OneToMany(
    () => OpenBoxGlobalPincodes,
    (openBoxGlobalPincodes) => openBoxGlobalPincodes.pincode,
  )
  openBoxGlobalPincodes: number[];

  @OneToMany(
    () => SameDayGlobalPincodes,
    (sameDayGlobalPincodes) => sameDayGlobalPincodes.pincode,
  )
  sameDayGlobalPincodes: number[];

  @OneToMany(
    () => SameDayProductPincodes,
    (sameDayProductPincodes) => sameDayProductPincodes.pincode,
  )
  sameDayProdcutPincodes: number[];

  @OneToMany(
    () => OpenBoxProductPincodes,
    (openBoxProductPincodes) => openBoxProductPincodes.pincode,
  )
  openBoxProductPincodes: number[];
}

//
