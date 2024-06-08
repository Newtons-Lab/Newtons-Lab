import { AuthorizationRole as AuthorizationRoleModel } from './authorization/authorization.model'
import {
  BillingPayment as BillingPaymentModel,
  BillingProduct as BillingProductModel,
  BillingSubscription as BillingSubscriptionModel,
} from './billing/billing.model'

import { User as UserModel } from './user/user.model'

import { Notification as NotificationModel } from './notification/notification.model'

import { BusinessAccount as BusinessAccountModel } from './businessAccount/businessAccount.model'

import { Location as LocationModel } from './location/location.model'

import { Review as ReviewModel } from './review/review.model'

import { Reply as ReplyModel } from './reply/reply.model'

import { AiPrompt as AiPromptModel } from './aiPrompt/aiPrompt.model'

import { History as HistoryModel } from './history/history.model'

export namespace Model {
  export class AuthorizationRole extends AuthorizationRoleModel {}
  export class BillingProduct extends BillingProductModel {}
  export class BillingPayment extends BillingPaymentModel {}
  export class BillingSubscription extends BillingSubscriptionModel {}

  export class User extends UserModel {}

  export class Notification extends NotificationModel {}

  export class BusinessAccount extends BusinessAccountModel {}

  export class Location extends LocationModel {}

  export class Review extends ReviewModel {}

  export class Reply extends ReplyModel {}

  export class AiPrompt extends AiPromptModel {}

  export class History extends HistoryModel {}
}
