import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { AiPrompt } from './aiPrompt.model'

export class AiPromptApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<AiPrompt>,
  ): Promise<AiPrompt[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/aiPrompts${buildOptions}`)
  }

  static findOne(
    aiPromptId: string,
    queryOptions?: ApiHelper.QueryOptions<AiPrompt>,
  ): Promise<AiPrompt> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/aiPrompts/${aiPromptId}${buildOptions}`)
  }

  static createOne(values: Partial<AiPrompt>): Promise<AiPrompt> {
    return HttpService.api.post(`/v1/aiPrompts`, values)
  }

  static updateOne(
    aiPromptId: string,
    values: Partial<AiPrompt>,
  ): Promise<AiPrompt> {
    return HttpService.api.patch(`/v1/aiPrompts/${aiPromptId}`, values)
  }

  static deleteOne(aiPromptId: string): Promise<void> {
    return HttpService.api.delete(`/v1/aiPrompts/${aiPromptId}`)
  }

  static findManyByUserId(
    userId: string,
    queryOptions?: ApiHelper.QueryOptions<AiPrompt>,
  ): Promise<AiPrompt[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/user/${userId}/aiPrompts${buildOptions}`,
    )
  }

  static createOneByUserId(
    userId: string,
    values: Partial<AiPrompt>,
  ): Promise<AiPrompt> {
    return HttpService.api.post(`/v1/users/user/${userId}/aiPrompts`, values)
  }
}
