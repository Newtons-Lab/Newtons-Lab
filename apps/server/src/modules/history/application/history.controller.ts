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
import { History, HistoryDomainFacade } from '@server/modules/history/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { HistoryApplicationEvent } from './history.application.event'
import { HistoryCreateDto, HistoryUpdateDto } from './history.dto'

@Controller('/v1/historys')
export class HistoryController {
  constructor(
    private eventService: EventService,
    private historyDomainFacade: HistoryDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.historyDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: HistoryCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.historyDomainFacade.create(body)

    await this.eventService.emit<HistoryApplicationEvent.HistoryCreated.Payload>(
      HistoryApplicationEvent.HistoryCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:historyId')
  async findOne(
    @Param('historyId') historyId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.historyDomainFacade.findOneByIdOrFail(
      historyId,
      queryOptions,
    )

    return item
  }

  @Patch('/:historyId')
  async update(
    @Param('historyId') historyId: string,
    @Body() body: HistoryUpdateDto,
  ) {
    const item = await this.historyDomainFacade.findOneByIdOrFail(historyId)

    const itemUpdated = await this.historyDomainFacade.update(
      item,
      body as Partial<History>,
    )
    return itemUpdated
  }

  @Delete('/:historyId')
  async delete(@Param('historyId') historyId: string) {
    const item = await this.historyDomainFacade.findOneByIdOrFail(historyId)

    await this.historyDomainFacade.delete(item)

    return item
  }
}
