import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from './authentication/domain'
import { AuthorizationDomainModule } from './authorization/domain'

import { UserDomainModule } from './user/domain'

import { NotificationDomainModule } from './notification/domain'

import { BusinessAccountDomainModule } from './businessAccount/domain'

import { LocationDomainModule } from './location/domain'

import { ReviewDomainModule } from './review/domain'

import { ReplyDomainModule } from './reply/domain'

import { AiPromptDomainModule } from './aiPrompt/domain'

import { HistoryDomainModule } from './history/domain'

@Module({
  imports: [
    AuthenticationDomainModule,
    AuthorizationDomainModule,
    UserDomainModule,
    NotificationDomainModule,

    BusinessAccountDomainModule,

    LocationDomainModule,

    ReviewDomainModule,

    ReplyDomainModule,

    AiPromptDomainModule,

    HistoryDomainModule,
  ],
  controllers: [],
  providers: [],
})
export class AppDomainModule {}
