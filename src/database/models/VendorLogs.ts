import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

@Entity('vendor_logs')
export class VendorLogs {
  @IsNotEmpty()
  @PrimaryGeneratedColumn({ name: 'id' })
  public id: number;

  @Column({ name: 'vendor_id' })
  public vendorId: number;

  @Column({ name: 'audits' })
  public audits: string;

  @Column({ name: 'created_at' })
  public createdAt: string;
}
