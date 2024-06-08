import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { HistoryDomainFacade } from '@server/modules/history/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { HistoryApplicationEvent } from './history.application.event'
import { HistoryCreateDto } from './history.dto'

import { ReviewDomainFacade } from '../../review/domain'

@Controller('/v1/reviews')
export class HistoryByReviewController {
  constructor(
    private reviewDomainFacade: ReviewDomainFacade,

    private historyDomainFacade: HistoryDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/review/:reviewId/historys')
  async findManyReviewId(
    @Param('reviewId') reviewId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.reviewDomainFacade.findOneByIdOrFail(reviewId)

    const items = await this.historyDomainFacade.findManyByReview(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/review/:reviewId/historys')
  async createByReviewId(
    @Param('reviewId') reviewId: string,
    @Body() body: HistoryCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, reviewId }

    const item = await this.historyDomainFacade.create(valuesUpdated)

    await this.eventService.emit<HistoryApplicationEvent.HistoryCreated.Payload>(
      HistoryApplicationEvent.HistoryCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
