import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { AiPromptDomainFacade } from '@server/modules/aiPrompt/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { AiPromptApplicationEvent } from './aiPrompt.application.event'
import { AiPromptCreateDto } from './aiPrompt.dto'

import { UserDomainFacade } from '../../user/domain'

@Controller('/v1/users')
export class AiPromptByUserController {
  constructor(
    private userDomainFacade: UserDomainFacade,

    private aiPromptDomainFacade: AiPromptDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/user/:userId/aiPrompts')
  async findManyUserId(
    @Param('userId') userId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(userId)

    const items = await this.aiPromptDomainFacade.findManyByUser(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/user/:userId/aiPrompts')
  async createByUserId(
    @Param('userId') userId: string,
    @Body() body: AiPromptCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, userId }

    const item = await this.aiPromptDomainFacade.create(valuesUpdated)

    await this.eventService.emit<AiPromptApplicationEvent.AiPromptCreated.Payload>(
      AiPromptApplicationEvent.AiPromptCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
