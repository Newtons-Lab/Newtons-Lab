import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { Location } from './location.model'

import { BusinessAccount } from '../../businessAccount/domain'

@Injectable()
export class LocationDomainFacade {
  constructor(
    @InjectRepository(Location)
    private repository: Repository<Location>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<Location>): Promise<Location> {
    return this.repository.save(values)
  }

  async update(item: Location, values: Partial<Location>): Promise<Location> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: Location): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<Location> = {},
  ): Promise<Location[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<Location> = {},
  ): Promise<Location> {
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

  async findManyByBusinessAccount(
    item: BusinessAccount,
    queryOptions: RequestHelper.QueryOptions<Location> = {},
  ): Promise<Location[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('businessAccount')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        businessAccountId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }
}
