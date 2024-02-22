import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('document_types')
export class DocumentTypes {
  @PrimaryGeneratedColumn({ name: 'id' })
  public id: number;

  @Column({ name: 'Name' })
  public name: string;

  @Column({ name: 'type' })
  public type: string;

  @Column({ name: 'site_id' })
  public siteId: number;
}
