import { Entity, Column, PrimaryGeneratedColumn, AfterInsert } from 'typeorm';

@Entity('emails')
export class Email {
  @PrimaryGeneratedColumn({ name: 'id' })
  public id: number;

  @Column({ name: 'name' })
  public name: string;

  @Column({ name: 'description' })
  public description: string;

  @AfterInsert()
  public async test(): Promise<void> {
    console.log(this.id);
    console.log(this.name);
  }
}
