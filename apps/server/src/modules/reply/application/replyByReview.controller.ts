import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { ReplyDomainFacade } from '@server/modules/reply/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { ReplyApplicationEvent } from './reply.application.event'
import { ReplyCreateDto } from './reply.dto'

import { ReviewDomainFacade } from '../../review/domain'

@Controller('/v1/reviews')
export class ReplyByReviewController {
  constructor(
    private reviewDomainFacade: ReviewDomainFacade,

    private replyDomainFacade: ReplyDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/review/:reviewId/replys')
  async findManyReviewId(
    @Param('reviewId') reviewId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.reviewDomainFacade.findOneByIdOrFail(reviewId)

    const items = await this.replyDomainFacade.findManyByReview(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/review/:reviewId/replys')
  async createByReviewId(
    @Param('reviewId') reviewId: string,
    @Body() body: ReplyCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, reviewId }

    const item = await this.replyDomainFacade.create(valuesUpdated)

    await this.eventService.emit<ReplyApplicationEvent.ReplyCreated.Payload>(
      ReplyApplicationEvent.ReplyCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
