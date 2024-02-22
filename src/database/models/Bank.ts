import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('banks')
export class Bank {
  @PrimaryGeneratedColumn({ name: 'id' })
  public id: number;

  @Column({ name: 'Name' })
  public name: string;
}
