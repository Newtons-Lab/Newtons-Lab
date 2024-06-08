import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { HistoryDomainModule } from '../domain'
import { HistoryController } from './history.controller'

import { ReviewDomainModule } from '../../../modules/review/domain'

import { HistoryByReviewController } from './historyByReview.controller'

import { ReplyDomainModule } from '../../../modules/reply/domain'

import { HistoryByReplyController } from './historyByReply.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    HistoryDomainModule,

    ReviewDomainModule,

    ReplyDomainModule,
  ],
  controllers: [
    HistoryController,

    HistoryByReviewController,

    HistoryByReplyController,
  ],
  providers: [],
})
export class HistoryApplicationModule {}
