import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('categories_ml')
export class CategoryML {
  @PrimaryGeneratedColumn({ name: 'id' })
  public id: number;

  @Column({ name: 'cat_id' })
  public catId: number;

  @Column({ name: 'lang_id' })
  public langId: number;

  @Column({ name: 'name' })
  public name: string;

  @Column({ name: 'meta_title' })
  public metaTitle: string;

  @Column({ name: 'meta_keyword' })
  public metaKeyword: string;

  @Column({ name: 'meta_description' })
  public metaDescription: string;

  @Column({ name: 'is_active' })
  public isActive: number;
}
