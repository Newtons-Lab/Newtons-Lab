import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { BusinessAccount } from './businessAccount.model'

export class BusinessAccountApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<BusinessAccount>,
  ): Promise<BusinessAccount[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/businessAccounts${buildOptions}`)
  }

  static findOne(
    businessAccountId: string,
    queryOptions?: ApiHelper.QueryOptions<BusinessAccount>,
  ): Promise<BusinessAccount> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/businessAccounts/${businessAccountId}${buildOptions}`,
    )
  }

  static createOne(values: Partial<BusinessAccount>): Promise<BusinessAccount> {
    return HttpService.api.post(`/v1/businessAccounts`, values)
  }

  static updateOne(
    businessAccountId: string,
    values: Partial<BusinessAccount>,
  ): Promise<BusinessAccount> {
    return HttpService.api.patch(
      `/v1/businessAccounts/${businessAccountId}`,
      values,
    )
  }

  static deleteOne(businessAccountId: string): Promise<void> {
    return HttpService.api.delete(`/v1/businessAccounts/${businessAccountId}`)
  }

  static findManyByUserId(
    userId: string,
    queryOptions?: ApiHelper.QueryOptions<BusinessAccount>,
  ): Promise<BusinessAccount[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/user/${userId}/businessAccounts${buildOptions}`,
    )
  }

  static createOneByUserId(
    userId: string,
    values: Partial<BusinessAccount>,
  ): Promise<BusinessAccount> {
    return HttpService.api.post(
      `/v1/users/user/${userId}/businessAccounts`,
      values,
    )
  }
}
