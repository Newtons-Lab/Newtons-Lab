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
import { AiPrompt, AiPromptDomainFacade } from '@server/modules/aiPrompt/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { AiPromptApplicationEvent } from './aiPrompt.application.event'
import { AiPromptCreateDto, AiPromptUpdateDto } from './aiPrompt.dto'

@Controller('/v1/aiPrompts')
export class AiPromptController {
  constructor(
    private eventService: EventService,
    private aiPromptDomainFacade: AiPromptDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.aiPromptDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: AiPromptCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.aiPromptDomainFacade.create(body)

    await this.eventService.emit<AiPromptApplicationEvent.AiPromptCreated.Payload>(
      AiPromptApplicationEvent.AiPromptCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:aiPromptId')
  async findOne(
    @Param('aiPromptId') aiPromptId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.aiPromptDomainFacade.findOneByIdOrFail(
      aiPromptId,
      queryOptions,
    )

    return item
  }

  @Patch('/:aiPromptId')
  async update(
    @Param('aiPromptId') aiPromptId: string,
    @Body() body: AiPromptUpdateDto,
  ) {
    const item = await this.aiPromptDomainFacade.findOneByIdOrFail(aiPromptId)

    const itemUpdated = await this.aiPromptDomainFacade.update(
      item,
      body as Partial<AiPrompt>,
    )
    return itemUpdated
  }

  @Delete('/:aiPromptId')
  async delete(@Param('aiPromptId') aiPromptId: string) {
    const item = await this.aiPromptDomainFacade.findOneByIdOrFail(aiPromptId)

    await this.aiPromptDomainFacade.delete(item)

    return item
  }
}
