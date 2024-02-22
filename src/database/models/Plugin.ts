import { Column, Entity } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm/index';
@Entity('plugins')
export class Plugin {
  @PrimaryGeneratedColumn({ name: 'id' })
  public id: number;

  @Column({ name: 'plugin_name' })
  public pluginName: string;

  @Column({ name: 'plugin_avatar' })
  public pluginAvatar: string;

  @Column({ name: 'plugin_avatar_path' })
  public pluginAvatarPath: string;

  @Column({ name: 'plugin_type' })
  public pluginType: string;

  @Column({ name: 'plugin_additional_info' })
  public pluginAdditionalInfo: string;

  @Column({ name: 'plugin_status' })
  public pluginStatus: number;
}
