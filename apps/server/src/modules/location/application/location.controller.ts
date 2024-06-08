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
import { Location, LocationDomainFacade } from '@server/modules/location/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { LocationApplicationEvent } from './location.application.event'
import { LocationCreateDto, LocationUpdateDto } from './location.dto'

@Controller('/v1/locations')
export class LocationController {
  constructor(
    private eventService: EventService,
    private locationDomainFacade: LocationDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.locationDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: LocationCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.locationDomainFacade.create(body)

    await this.eventService.emit<LocationApplicationEvent.LocationCreated.Payload>(
      LocationApplicationEvent.LocationCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:locationId')
  async findOne(
    @Param('locationId') locationId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.locationDomainFacade.findOneByIdOrFail(
      locationId,
      queryOptions,
    )

    return item
  }

  @Patch('/:locationId')
  async update(
    @Param('locationId') locationId: string,
    @Body() body: LocationUpdateDto,
  ) {
    const item = await this.locationDomainFacade.findOneByIdOrFail(locationId)

    const itemUpdated = await this.locationDomainFacade.update(
      item,
      body as Partial<Location>,
    )
    return itemUpdated
  }

  @Delete('/:locationId')
  async delete(@Param('locationId') locationId: string) {
    const item = await this.locationDomainFacade.findOneByIdOrFail(locationId)

    await this.locationDomainFacade.delete(item)

    return item
  }
}
