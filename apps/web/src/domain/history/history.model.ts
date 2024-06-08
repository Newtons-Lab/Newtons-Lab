import { Review } from '../review'

import { Reply } from '../reply'

export class History {
  id: string

  exportStatus: string

  reviewId: string

  review?: Review

  replyId: string

  reply?: Reply

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
