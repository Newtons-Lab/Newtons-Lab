import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Review } from './review.model'

export class ReviewApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Review>,
  ): Promise<Review[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/reviews${buildOptions}`)
  }

  static findOne(
    reviewId: string,
    queryOptions?: ApiHelper.QueryOptions<Review>,
  ): Promise<Review> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/reviews/${reviewId}${buildOptions}`)
  }

  static createOne(values: Partial<Review>): Promise<Review> {
    return HttpService.api.post(`/v1/reviews`, values)
  }

  static updateOne(reviewId: string, values: Partial<Review>): Promise<Review> {
    return HttpService.api.patch(`/v1/reviews/${reviewId}`, values)
  }

  static deleteOne(reviewId: string): Promise<void> {
    return HttpService.api.delete(`/v1/reviews/${reviewId}`)
  }

  static findManyByLocationId(
    locationId: string,
    queryOptions?: ApiHelper.QueryOptions<Review>,
  ): Promise<Review[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/locations/location/${locationId}/reviews${buildOptions}`,
    )
  }

  static createOneByLocationId(
    locationId: string,
    values: Partial<Review>,
  ): Promise<Review> {
    return HttpService.api.post(
      `/v1/locations/location/${locationId}/reviews`,
      values,
    )
  }
}
