import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { LocationDomainFacade } from '@server/modules/location/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { LocationApplicationEvent } from './location.application.event'
import { LocationCreateDto } from './location.dto'

import { BusinessAccountDomainFacade } from '../../businessAccount/domain'

@Controller('/v1/businessAccounts')
export class LocationByBusinessAccountController {
  constructor(
    private businessAccountDomainFacade: BusinessAccountDomainFacade,

    private locationDomainFacade: LocationDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/businessAccount/:businessAccountId/locations')
  async findManyBusinessAccountId(
    @Param('businessAccountId') businessAccountId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent =
      await this.businessAccountDomainFacade.findOneByIdOrFail(
        businessAccountId,
      )

    const items = await this.locationDomainFacade.findManyByBusinessAccount(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/businessAccount/:businessAccountId/locations')
  async createByBusinessAccountId(
    @Param('businessAccountId') businessAccountId: string,
    @Body() body: LocationCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, businessAccountId }

    const item = await this.locationDomainFacade.create(valuesUpdated)

    await this.eventService.emit<LocationApplicationEvent.LocationCreated.Payload>(
      LocationApplicationEvent.LocationCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
