import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { BusinessAccountDomainFacade } from '@server/modules/businessAccount/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { BusinessAccountApplicationEvent } from './businessAccount.application.event'
import { BusinessAccountCreateDto } from './businessAccount.dto'

import { UserDomainFacade } from '../../user/domain'

@Controller('/v1/users')
export class BusinessAccountByUserController {
  constructor(
    private userDomainFacade: UserDomainFacade,

    private businessAccountDomainFacade: BusinessAccountDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/user/:userId/businessAccounts')
  async findManyUserId(
    @Param('userId') userId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(userId)

    const items = await this.businessAccountDomainFacade.findManyByUser(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/user/:userId/businessAccounts')
  async createByUserId(
    @Param('userId') userId: string,
    @Body() body: BusinessAccountCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, userId }

    const item = await this.businessAccountDomainFacade.create(valuesUpdated)

    await this.eventService.emit<BusinessAccountApplicationEvent.BusinessAccountCreated.Payload>(
      BusinessAccountApplicationEvent.BusinessAccountCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
