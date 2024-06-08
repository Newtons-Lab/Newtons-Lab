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

import { Review } from '../../../modules/review/domain'

import { History } from '../../../modules/history/domain'

@Entity()
export class Reply {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({})
  replyText: string

  @Column({})
  publishedDate: string

  @Column({})
  isAiGenerated: boolean

  @Column({})
  reviewId: string

  @ManyToOne(() => Review, parent => parent.replys)
  @JoinColumn({ name: 'reviewId' })
  review?: Review

  @OneToMany(() => History, child => child.reply)
  historys?: History[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
