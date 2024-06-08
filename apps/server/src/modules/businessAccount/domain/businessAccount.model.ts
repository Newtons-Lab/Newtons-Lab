import { ColumnNumeric } from '@server/core/database'
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { User } from '../../../modules/user/domain'

import { Location } from '../../../modules/location/domain'

@Entity()
export class BusinessAccount {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({})
  googleAccountId: string

  @Column({})
  accessToken: string

  @Column({})
  refreshToken: string

  @Column({})
  userId: string

  @ManyToOne(() => User, parent => parent.businessAccounts)
  @JoinColumn({ name: 'userId' })
  user?: User

  @OneToMany(() => Location, child => child.businessAccount)
  locations?: Location[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
