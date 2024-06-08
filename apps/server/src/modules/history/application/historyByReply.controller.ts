import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { HistoryDomainFacade } from '@server/modules/history/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { HistoryApplicationEvent } from './history.application.event'
import { HistoryCreateDto } from './history.dto'

import { ReplyDomainFacade } from '../../reply/domain'

@Controller('/v1/replys')
export class HistoryByReplyController {
  constructor(
    private replyDomainFacade: ReplyDomainFacade,

    private historyDomainFacade: HistoryDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/reply/:replyId/historys')
  async findManyReplyId(
    @Param('replyId') replyId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.replyDomainFacade.findOneByIdOrFail(replyId)

    const items = await this.historyDomainFacade.findManyByReply(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/reply/:replyId/historys')
  async createByReplyId(
    @Param('replyId') replyId: string,
    @Body() body: HistoryCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, replyId }

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
