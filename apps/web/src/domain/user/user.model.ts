import { Notification } from '../notification'

import { BusinessAccount } from '../businessAccount'

import { AiPrompt } from '../aiPrompt'

export enum UserStatus {
  CREATED = 'CREATED',
  VERIFIED = 'VERIFIED',
}
export class User {
  id: string
  email?: string
  status: UserStatus
  name?: string
  pictureUrl?: string
  password?: string
  dateCreated: string
  dateUpdated: string
  notifications?: Notification[]

  businessAccounts?: BusinessAccount[]

  aiPrompts?: AiPrompt[]
}
