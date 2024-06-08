import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { AiPromptDomainModule } from '../domain'
import { AiPromptController } from './aiPrompt.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { AiPromptByUserController } from './aiPromptByUser.controller'

@Module({
  imports: [AuthenticationDomainModule, AiPromptDomainModule, UserDomainModule],
  controllers: [AiPromptController, AiPromptByUserController],
  providers: [],
})
export class AiPromptApplicationModule {}
