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
import {
  BusinessAccount,
  BusinessAccountDomainFacade,
} from '@server/modules/businessAccount/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { BusinessAccountApplicationEvent } from './businessAccount.application.event'
import {
  BusinessAccountCreateDto,
  BusinessAccountUpdateDto,
} from './businessAccount.dto'

@Controller('/v1/businessAccounts')
export class BusinessAccountController {
  constructor(
    private eventService: EventService,
    private businessAccountDomainFacade: BusinessAccountDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.businessAccountDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(
    @Body() body: BusinessAccountCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.businessAccountDomainFacade.create(body)

    await this.eventService.emit<BusinessAccountApplicationEvent.BusinessAccountCreated.Payload>(
      BusinessAccountApplicationEvent.BusinessAccountCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:businessAccountId')
  async findOne(
    @Param('businessAccountId') businessAccountId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.businessAccountDomainFacade.findOneByIdOrFail(
      businessAccountId,
      queryOptions,
    )

    return item
  }

  @Patch('/:businessAccountId')
  async update(
    @Param('businessAccountId') businessAccountId: string,
    @Body() body: BusinessAccountUpdateDto,
  ) {
    const item =
      await this.businessAccountDomainFacade.findOneByIdOrFail(
        businessAccountId,
      )

    const itemUpdated = await this.businessAccountDomainFacade.update(
      item,
      body as Partial<BusinessAccount>,
    )
    return itemUpdated
  }

  @Delete('/:businessAccountId')
  async delete(@Param('businessAccountId') businessAccountId: string) {
    const item =
      await this.businessAccountDomainFacade.findOneByIdOrFail(
        businessAccountId,
      )

    await this.businessAccountDomainFacade.delete(item)

    return item
  }
}
