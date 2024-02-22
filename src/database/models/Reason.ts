import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('reasons')
export class Reason {
  @PrimaryGeneratedColumn({ name: 'id' })
  public id: string;

  @Column({ name: 'reason_type' })
  public reasonType: string;

  @Column({ name: 'description' })
  public description: string;

  @Column({ name: 'is_active' })
  public isActive: number;
}
