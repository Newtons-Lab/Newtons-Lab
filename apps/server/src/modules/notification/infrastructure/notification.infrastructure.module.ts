import { Module } from '@nestjs/common'
import { SocketModule } from '@server/libraries/socket'
import { AuthorizationDomainModule } from '@server/modules/authorization/domain'
import { NotificationDomainModule } from '../domain'

import { NotificationBusinessAccountSubscriber } from './subscribers/notification.businessAccount.subscriber'

import { NotificationLocationSubscriber } from './subscribers/notification.location.subscriber'

import { NotificationReviewSubscriber } from './subscribers/notification.review.subscriber'

import { NotificationReplySubscriber } from './subscribers/notification.reply.subscriber'

import { NotificationAiPromptSubscriber } from './subscribers/notification.aiPrompt.subscriber'

import { NotificationHistorySubscriber } from './subscribers/notification.history.subscriber'

@Module({
  imports: [AuthorizationDomainModule, NotificationDomainModule, SocketModule],
  providers: [
    NotificationBusinessAccountSubscriber,

    NotificationLocationSubscriber,

    NotificationReviewSubscriber,

    NotificationReplySubscriber,

    NotificationAiPromptSubscriber,

    NotificationHistorySubscriber,
  ],
  exports: [],
})
export class NotificationInfrastructureModule {}
