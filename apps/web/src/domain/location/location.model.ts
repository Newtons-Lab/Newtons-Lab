import { BusinessAccount } from '../businessAccount'

import { Review } from '../review'

export class Location {
  id: string

  name: string

  address: string

  businessAccountId: string

  businessAccount?: BusinessAccount

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  reviews?: Review[]
}
