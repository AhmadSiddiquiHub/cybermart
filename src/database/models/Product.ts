import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OpenBoxProductPincodes } from './OpenBoxProductPincodes';
import { SameDayProductPincodes } from './SameDayProductPincodes';
@Entity('products')
export class Product {
  @PrimaryGeneratedColumn({ name: 'id' })
  public id: number;

  @Column({ name: 'name' })
  public name: string;

  @Column({ name: 'long_desc' })
  public longDesc: string;

  @Column({ name: 'desc_editor_design' })
  public descEditorDesign: string;

  @Column({ name: 'short_desc' })
  public shortDesc: string;

  @Column({ name: 'more_information' })
  public moreInformation: string;

  @Column({ name: 'bullet_points' })
  public bulletPoints: string;

  @Column({ name: 'avg_rating' })
  public avgRating: number;

  @Column({ name: 'review_count' })
  public reviewCount: number;

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

  @OneToMany(
    () => SameDayProductPincodes,
    (sameDayProductPincodes) => sameDayProductPincodes.product_id,
  )
  public sameDayProductPincodes: SameDayProductPincodes[];

  @OneToMany(
    () => OpenBoxProductPincodes,
    (openBoxProductPincodes) => openBoxProductPincodes.productId,
  )
  public openBoxProductPincodes: OpenBoxProductPincodes[];
}
