import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sites')
export class Site {
  @PrimaryGeneratedColumn({ name: 'id' })
  public id: number;

  @Column({ name: 'country_id' })
  public countryId: number;

  @Column({ name: 'iso1' })
  public iso1: string;

  @Column({ name: 'zipcode_formate' })
  public zipcodeFormate: number;

  @Column({ name: 'fb_link' })
  public fbLink: string;

  @Column({ name: 'insta_link' })
  public instaLink: string;

  @Column({ name: 'twitter_link' })
  public twitterLink: string;

  @Column({ name: 'linkedin_link' })
  public linkedinLink: string;

  @Column({ name: 'youtube_link' })
  public youtubeLink: string;

  @Column({ name: 'pinterest_link' })
  public pinterestLink: string;

  @Column({ name: 'favicon' })
  public favicon: string;

  @Column({ name: 'logo' })
  public logo: string;

  @Column({ name: 'website_link' })
  public websiteLink: string;

  @Column({ name: 'bucket_base_url' })
  public bucketBaseUrl: string;

  @Column({ name: 'play_store_app_url' })
  public playStoreAppUrl: string;

  @Column({ name: 'apple_store_app_url' })
  public appleStoreAppUrl: string;

  @Column({ name: 'qr_code_play_store_app' })
  public QRCodePlayStoreApp: string;

  @Column({ name: 'qr_code_apple_store_app' })
  public QRCodeAppleStoreApp: string;

  @Column({ name: 'currency_symbol' })
  public currencySymbol: string;
}
