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

import { Reply } from '../../../modules/reply/domain'

@Entity()
export class History {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({})
  exportStatus: string

  @Column({})
  reviewId: string

  @ManyToOne(() => Review, parent => parent.historys)
  @JoinColumn({ name: 'reviewId' })
  review?: Review

  @Column({})
  replyId: string

  @ManyToOne(() => Reply, parent => parent.historys)
  @JoinColumn({ name: 'replyId' })
  reply?: Reply

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
