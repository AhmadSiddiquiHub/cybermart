import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import moment = require('moment');
import { AppLevelDateTimeFormat } from '../../utils';
import { Users } from './Users';

@Entity('user_addresses')
export class UserAddresses {
  @PrimaryGeneratedColumn({ name: 'address_id' })
  public addressId: number;

  @Column({ name: 'name' })
  public name: string;

  @Column({ name: 'user_id' })
  public userId: number;

  @Column({ name: 'country_id' })
  public countryId: number;

  @Column({ name: 'state_id' })
  public stateId: number;

  @Column({ name: 'city_id' })
  public cityId: number;

  @Column({ name: 'user_type_id' })
  public userTypeId: string;

  @Column({ name: 'type' })
  public type: string;

  @Column({ name: 'line_addr_1' })
  public Lineaddr1: string;

  @Column({ name: 'line_addr_2' })
  public Lineaddr2: string;

  @Column({ name: 'line_addr_3' })
  public Lineaddr3: string;

  @Column({ name: 'zipcode' })
  public zipcode: number;

  @Column({ name: 'is_default' })
  public isDefault: number;

  @Column({ name: 'created_at' })
  public createdAt: string;

  @Column({ name: 'updated_at' })
  public updateAt: string;

  @Column({ name: 'is_active' })
  public isActive: number;

  @ManyToOne(() => Users, (users) => users.useradd)
  @JoinColumn({ name: 'user_id' })
  public users: Users;

  @BeforeInsert()
  public async createDetails(): Promise<void> {
    this.createdAt = moment().format(AppLevelDateTimeFormat);
  }

  @BeforeUpdate()
  public async updateDetails(): Promise<void> {
    this.updateAt = moment().format(AppLevelDateTimeFormat);
  }
}
