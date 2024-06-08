import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Location } from './location.model'

export class LocationApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Location>,
  ): Promise<Location[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/locations${buildOptions}`)
  }

  static findOne(
    locationId: string,
    queryOptions?: ApiHelper.QueryOptions<Location>,
  ): Promise<Location> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/locations/${locationId}${buildOptions}`)
  }

  static createOne(values: Partial<Location>): Promise<Location> {
    return HttpService.api.post(`/v1/locations`, values)
  }

  static updateOne(
    locationId: string,
    values: Partial<Location>,
  ): Promise<Location> {
    return HttpService.api.patch(`/v1/locations/${locationId}`, values)
  }

  static deleteOne(locationId: string): Promise<void> {
    return HttpService.api.delete(`/v1/locations/${locationId}`)
  }

  static findManyByBusinessAccountId(
    businessAccountId: string,
    queryOptions?: ApiHelper.QueryOptions<Location>,
  ): Promise<Location[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/businessAccounts/businessAccount/${businessAccountId}/locations${buildOptions}`,
    )
  }

  static createOneByBusinessAccountId(
    businessAccountId: string,
    values: Partial<Location>,
  ): Promise<Location> {
    return HttpService.api.post(
      `/v1/businessAccounts/businessAccount/${businessAccountId}/locations`,
      values,
    )
  }
}
