import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('attributes')
export class Attribute {
  @PrimaryGeneratedColumn({ name: 'id' })
  public id: number;

  @Column({ name: 'label' })
  public label: string;

  @Column({ name: 'form_name' })
  public formName: string;

  @Column({ name: 'attribute_type' })
  public attributeType: string;
}
