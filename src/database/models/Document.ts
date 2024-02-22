import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import moment from 'moment';
import { AppLevelDateTimeFormat } from '../../utils';

@Entity('documents')
export class Documents {
  @IsNotEmpty()
  @PrimaryGeneratedColumn({ name: 'id' })
  public documentId: number;

  @Column({ name: 'country_id' })
  public countryId: number;

  @Column({ name: 'vendor_id' })
  public vendorId: number;

  @Column({ name: 'identity_type' })
  public identityType: string;

  @Column({ name: 'document_type_id' })
  public documentTypeId: number;

  @Column({ name: 'identity_number' })
  public identityNumber: number;

  @Column({ name: 'issue_date' })
  public issueDate: string;

  @Column({ name: 'expiry_date' })
  public expiryDate: string;

  @Column({ name: 'front_image' })
  public frontImage: string;

  @Column({ name: 'back_image' })
  public backImage: string;

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
