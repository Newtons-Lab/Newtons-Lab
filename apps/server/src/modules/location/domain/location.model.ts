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

import { BusinessAccount } from '../../../modules/businessAccount/domain'

import { Review } from '../../../modules/review/domain'

@Entity()
export class Location {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({})
  name: string

  @Column({})
  address: string

  @Column({})
  businessAccountId: string

  @ManyToOne(() => BusinessAccount, parent => parent.locations)
  @JoinColumn({ name: 'businessAccountId' })
  businessAccount?: BusinessAccount

  @OneToMany(() => Review, child => child.location)
  reviews?: Review[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
