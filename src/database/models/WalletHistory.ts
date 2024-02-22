import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('wallet_history')
export class WalletHistory {
  @PrimaryGeneratedColumn({ name: 'id' })
  public walletHistoryId: number;

  @Column({ name: 'type' })
  public type: string;

  @Column({ name: 'user_id' })
  public userId: number;

  @Column({ name: 'order_id' })
  public orderId: number;

  @Column({ name: 'status' })
  public status: string;

  @Column({ name: 'amount' })
  public amount: number;

  @Column({ name: 'created_date' })
  public createdDate: string;
}
