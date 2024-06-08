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

import { Location } from '../../../modules/location/domain'

import { Reply } from '../../../modules/reply/domain'

import { History } from '../../../modules/history/domain'

@Entity()
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({})
  reviewText: string

  @Column({})
  reviewDate: string

  @Column({})
  status: string

  @Column({})
  locationId: string

  @ManyToOne(() => Location, parent => parent.reviews)
  @JoinColumn({ name: 'locationId' })
  location?: Location

  @OneToMany(() => Reply, child => child.review)
  replys?: Reply[]

  @OneToMany(() => History, child => child.review)
  historys?: History[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
