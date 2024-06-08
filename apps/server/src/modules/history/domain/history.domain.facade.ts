import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { History } from './history.model'

import { Review } from '../../review/domain'

import { Reply } from '../../reply/domain'

@Injectable()
export class HistoryDomainFacade {
  constructor(
    @InjectRepository(History)
    private repository: Repository<History>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<History>): Promise<History> {
    return this.repository.save(values)
  }

  async update(item: History, values: Partial<History>): Promise<History> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: History): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<History> = {},
  ): Promise<History[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<History> = {},
  ): Promise<History> {
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
    queryOptions: RequestHelper.QueryOptions<History> = {},
  ): Promise<History[]> {
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

  async findManyByReply(
    item: Reply,
    queryOptions: RequestHelper.QueryOptions<History> = {},
  ): Promise<History[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('reply')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        replyId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }
}
