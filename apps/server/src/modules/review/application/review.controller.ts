import { Request } from 'express'

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common'
import { EventService } from '@server/libraries/event'
import { Review, ReviewDomainFacade } from '@server/modules/review/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { ReviewApplicationEvent } from './review.application.event'
import { ReviewCreateDto, ReviewUpdateDto } from './review.dto'

@Controller('/v1/reviews')
export class ReviewController {
  constructor(
    private eventService: EventService,
    private reviewDomainFacade: ReviewDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.reviewDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: ReviewCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.reviewDomainFacade.create(body)

    await this.eventService.emit<ReviewApplicationEvent.ReviewCreated.Payload>(
      ReviewApplicationEvent.ReviewCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:reviewId')
  async findOne(@Param('reviewId') reviewId: string, @Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.reviewDomainFacade.findOneByIdOrFail(
      reviewId,
      queryOptions,
    )

    return item
  }

  @Patch('/:reviewId')
  async update(
    @Param('reviewId') reviewId: string,
    @Body() body: ReviewUpdateDto,
  ) {
    const item = await this.reviewDomainFacade.findOneByIdOrFail(reviewId)

    const itemUpdated = await this.reviewDomainFacade.update(
      item,
      body as Partial<Review>,
    )
    return itemUpdated
  }

  @Delete('/:reviewId')
  async delete(@Param('reviewId') reviewId: string) {
    const item = await this.reviewDomainFacade.findOneByIdOrFail(reviewId)

    await this.reviewDomainFacade.delete(item)

    return item
  }
}
