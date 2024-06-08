import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Reply } from './reply.model'

export class ReplyApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Reply>,
  ): Promise<Reply[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/replys${buildOptions}`)
  }

  static findOne(
    replyId: string,
    queryOptions?: ApiHelper.QueryOptions<Reply>,
  ): Promise<Reply> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/replys/${replyId}${buildOptions}`)
  }

  static createOne(values: Partial<Reply>): Promise<Reply> {
    return HttpService.api.post(`/v1/replys`, values)
  }

  static updateOne(replyId: string, values: Partial<Reply>): Promise<Reply> {
    return HttpService.api.patch(`/v1/replys/${replyId}`, values)
  }

  static deleteOne(replyId: string): Promise<void> {
    return HttpService.api.delete(`/v1/replys/${replyId}`)
  }

  static findManyByReviewId(
    reviewId: string,
    queryOptions?: ApiHelper.QueryOptions<Reply>,
  ): Promise<Reply[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/reviews/review/${reviewId}/replys${buildOptions}`,
    )
  }

  static createOneByReviewId(
    reviewId: string,
    values: Partial<Reply>,
  ): Promise<Reply> {
    return HttpService.api.post(`/v1/reviews/review/${reviewId}/replys`, values)
  }
}
