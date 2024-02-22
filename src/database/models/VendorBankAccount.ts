import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('vendor_bank_accounts')
export class VendorBankAccount {
  @PrimaryGeneratedColumn({ name: 'id' })
  public id: number;

  @Column({ name: 'vendor_id' })
  public vendorId: number;

  @Column({ name: 'bank_id' })
  public bankId: number;

  @Column({ name: 'account_no' })
  public accountNo: string;

  @Column({ name: 'account_holder_name' })
  public accountHolderName: string;

  @Column({ name: 'IBAN' })
  public IBAN: string;

  @Column({ name: 'cheque_image' })
  public chequeImage: string;

  @Column({ name: 'branch_code' })
  public branchCode: number;
}
