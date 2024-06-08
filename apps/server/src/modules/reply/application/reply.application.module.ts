import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { ReplyDomainModule } from '../domain'
import { ReplyController } from './reply.controller'

import { ReviewDomainModule } from '../../../modules/review/domain'

import { ReplyByReviewController } from './replyByReview.controller'

@Module({
  imports: [AuthenticationDomainModule, ReplyDomainModule, ReviewDomainModule],
  controllers: [ReplyController, ReplyByReviewController],
  providers: [],
})
export class ReplyApplicationModule {}
