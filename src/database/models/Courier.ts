import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('couriers')
export class Courier {
  @PrimaryGeneratedColumn({ name: 'id' })
  public id: number;

  @Column({ name: 'name' })
  public name: string;

  @Column({ name: 'country_id' })
  public countryId: number;

  @Column({ name: 'active' })
  public active: number;
}
