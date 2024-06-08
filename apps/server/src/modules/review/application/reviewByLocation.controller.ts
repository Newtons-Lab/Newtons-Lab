import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { ReviewDomainFacade } from '@server/modules/review/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { ReviewApplicationEvent } from './review.application.event'
import { ReviewCreateDto } from './review.dto'

import { LocationDomainFacade } from '../../location/domain'

@Controller('/v1/locations')
export class ReviewByLocationController {
  constructor(
    private locationDomainFacade: LocationDomainFacade,

    private reviewDomainFacade: ReviewDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/location/:locationId/reviews')
  async findManyLocationId(
    @Param('locationId') locationId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.locationDomainFacade.findOneByIdOrFail(locationId)

    const items = await this.reviewDomainFacade.findManyByLocation(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/location/:locationId/reviews')
  async createByLocationId(
    @Param('locationId') locationId: string,
    @Body() body: ReviewCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, locationId }

    const item = await this.reviewDomainFacade.create(valuesUpdated)

    await this.eventService.emit<ReviewApplicationEvent.ReviewCreated.Payload>(
      ReviewApplicationEvent.ReviewCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
