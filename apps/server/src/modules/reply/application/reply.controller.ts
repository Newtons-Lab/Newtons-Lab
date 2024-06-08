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
import { Reply, ReplyDomainFacade } from '@server/modules/reply/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { ReplyApplicationEvent } from './reply.application.event'
import { ReplyCreateDto, ReplyUpdateDto } from './reply.dto'

@Controller('/v1/replys')
export class ReplyController {
  constructor(
    private eventService: EventService,
    private replyDomainFacade: ReplyDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.replyDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: ReplyCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.replyDomainFacade.create(body)

    await this.eventService.emit<ReplyApplicationEvent.ReplyCreated.Payload>(
      ReplyApplicationEvent.ReplyCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:replyId')
  async findOne(@Param('replyId') replyId: string, @Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.replyDomainFacade.findOneByIdOrFail(
      replyId,
      queryOptions,
    )

    return item
  }

  @Patch('/:replyId')
  async update(
    @Param('replyId') replyId: string,
    @Body() body: ReplyUpdateDto,
  ) {
    const item = await this.replyDomainFacade.findOneByIdOrFail(replyId)

    const itemUpdated = await this.replyDomainFacade.update(
      item,
      body as Partial<Reply>,
    )
    return itemUpdated
  }

  @Delete('/:replyId')
  async delete(@Param('replyId') replyId: string) {
    const item = await this.replyDomainFacade.findOneByIdOrFail(replyId)

    await this.replyDomainFacade.delete(item)

    return item
  }
}
