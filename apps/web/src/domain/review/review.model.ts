import { Location } from '../location'

import { Reply } from '../reply'

import { History } from '../history'

export class Review {
  id: string

  reviewText: string

  reviewDate: string

  status: string

  locationId: string

  location?: Location

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  replys?: Reply[]

  historys?: History[]
}
