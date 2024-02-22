import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('variants')
export class Variant {
  @PrimaryGeneratedColumn({ name: 'id' })
  public id: number;

  @Column({ name: 'type' })
  public type: string;

  @Column({ name: 'name' })
  public name: string;

  @Column({ name: 'accept_images' })
  public acceptImages: number;
}
