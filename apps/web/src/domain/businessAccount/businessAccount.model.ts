import { User } from '../user'

import { Location } from '../location'

export class BusinessAccount {
  id: string

  googleAccountId: string

  accessToken: string

  refreshToken: string

  userId: string

  user?: User

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  locations?: Location[]
}
