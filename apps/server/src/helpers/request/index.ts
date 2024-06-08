import * as bodyParser from 'body-parser'
import { NextFunction, Request, Response } from 'express'
export namespace RequestHelper {
  export function getPath(request: Request): string {
    return request?.path
  }
  export function getMethod(request: Request): string {
    return request?.method
  }

  export function getBody(request: Request): any {
    return request?.body
  }

  export type FilterCondition = {
    eq?: number // Equal to
    neq?: number // Not equal to
    gt?: number // Greater than
    gte?: number // Greater than or equal to
    lt?: number // Less than
    lte?: number // Less than or equal to
    in?: any[] // In array
    nin?: any[] // Not in array
    like?: string // case sensitive
    ilike?: string // not case sensitive
  }

  export type QueryOptions<Model = any> = {
    filters?: Partial<Record<keyof Model, any | any[] | FilterCondition>>
    orders?: Partial<Record<keyof Model, 'ASC' | 'DESC'>>
    includes?: string[]
    pagination?: {
      page?: number
      countItems?: number
    }
  }

  export function getQueryOptions(request: Request): QueryOptions {
    const queryOptions = request.query.queryOptions as string

    if (queryOptions) {
      try {
        return JSON.parse(queryOptions)
      } catch (error) {
        throw new Error(error)
      }
    }

    return {}
  }

  export function getAuthorization(request: Request): string {
    const token = request?.headers?.['authorization'] as string

    return token?.replace('Bearer ', '')?.trim()
  }

  export function getRawBody(request: Request): any {
    return request?.['rawBodyBuffer']
  }

  export function handleRawBody(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    if (!request?.path?.endsWith('/raw')) {
      next()
      return
    }

    const captureRawBodyMiddleware = bodyParser.raw({ type: () => true })

    captureRawBodyMiddleware(request, response, (error: any) => {
      if (error) {
        next()
        return
      }
      request['rawBodyBuffer'] = request.body
      next()
    })
  }
}
