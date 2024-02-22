import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('category_path')
export class CategoryPath {
  @PrimaryGeneratedColumn({ name: 'id' })
  public id: number;

  @Column({ name: 'cat_id' })
  public catId: number;

  @Column({ name: 'path_id' })
  public pathId: number;

  @Column({ name: 'level' })
  public level: string;
}
