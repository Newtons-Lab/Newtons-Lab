import { AiApi } from './ai/ai.api'
import { AuthenticationApi } from './authentication/authentication.api'
import { AuthorizationApi } from './authorization/authorization.api'
import { BillingApi } from './billing/billing.api'
import { UploadApi } from './upload/upload.api'

import { UserApi } from './user/user.api'

import { NotificationApi } from './notification/notification.api'

import { BusinessAccountApi } from './businessAccount/businessAccount.api'

import { LocationApi } from './location/location.api'

import { ReviewApi } from './review/review.api'

import { ReplyApi } from './reply/reply.api'

import { AiPromptApi } from './aiPrompt/aiPrompt.api'

import { HistoryApi } from './history/history.api'

export namespace Api {
  export class Ai extends AiApi {}
  export class Authentication extends AuthenticationApi {}
  export class Authorization extends AuthorizationApi {}
  export class Billing extends BillingApi {}
  export class Upload extends UploadApi {}

  export class User extends UserApi {}

  export class Notification extends NotificationApi {}

  export class BusinessAccount extends BusinessAccountApi {}

  export class Location extends LocationApi {}

  export class Review extends ReviewApi {}

  export class Reply extends ReplyApi {}

  export class AiPrompt extends AiPromptApi {}

  export class History extends HistoryApi {}
}
