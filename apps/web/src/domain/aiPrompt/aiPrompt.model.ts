import { User } from '../user'

export class AiPrompt {
  id: string

  promptText: string

  userId: string

  user?: User

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
