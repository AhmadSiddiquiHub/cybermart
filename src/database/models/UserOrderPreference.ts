import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_order_preferences')
export class UserOrderPreference {
  @PrimaryGeneratedColumn({ name: 'id' })
  public id: number;

  @Column({ name: 'order_preference_id' })
  public orderPreferenceId: number;

  @Column({ name: 'user_id' })
  public vendorId: number;
}
