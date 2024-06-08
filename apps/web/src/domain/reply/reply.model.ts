import { Review } from '../review'

import { History } from '../history'

export class Reply {
  id: string

  replyText: string

  publishedDate: string

  isAiGenerated: boolean

  reviewId: string

  review?: Review

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  historys?: History[]
}
