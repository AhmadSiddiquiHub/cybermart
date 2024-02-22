import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('attribute_values')
export class AttributeValue {
  @PrimaryGeneratedColumn({ name: 'id' })
  public id: number;

  @Column({ name: 'product_attribute_id' })
  public productAttributeId: number;

  @Column({ name: 'name' })
  public name: string;

  @Column({ name: 'category_id' })
  public categoryId: number;
}
