import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { Reply } from './reply.model'

import { Review } from '../../review/domain'

@Injectable()
export class ReplyDomainFacade {
  constructor(
    @InjectRepository(Reply)
    private repository: Repository<Reply>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<Reply>): Promise<Reply> {
    return this.repository.save(values)
  }

  async update(item: Reply, values: Partial<Reply>): Promise<Reply> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: Reply): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<Reply> = {},
  ): Promise<Reply[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<Reply> = {},
  ): Promise<Reply> {
    if (!id) {
      this.databaseHelper.invalidQueryWhere('id')
    }

    const queryOptionsEnsured = {
      includes: queryOptions?.includes,
      filters: {
        id: id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    const item = await query.getOne()

    if (!item) {
      this.databaseHelper.notFoundByQuery(queryOptionsEnsured.filters)
    }

    return item
  }

  async findManyByReview(
    item: Review,
    queryOptions: RequestHelper.QueryOptions<Reply> = {},
  ): Promise<Reply[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('review')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        reviewId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }
}
