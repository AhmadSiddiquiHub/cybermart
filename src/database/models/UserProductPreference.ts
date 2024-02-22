import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_product_preferences')
export class UserProductPreference {
  @PrimaryGeneratedColumn({ name: 'id' })
  public id: number;

  @Column({ name: 'product_preference_id' })
  public productPreferenceId: number;

  @Column({ name: 'user_id' })
  public userId: number;
}
