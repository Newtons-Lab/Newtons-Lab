import { Module } from '@nestjs/common'
import { AuthenticationApplicationModule } from './authentication/application'
import { AuthorizationApplicationModule } from './authorization/application'
import { UserApplicationModule } from './user/application'

import { BusinessAccountApplicationModule } from './businessAccount/application'

import { LocationApplicationModule } from './location/application'

import { ReviewApplicationModule } from './review/application'

import { ReplyApplicationModule } from './reply/application'

import { AiPromptApplicationModule } from './aiPrompt/application'

import { HistoryApplicationModule } from './history/application'

import { AiApplicationModule } from './ai/application/ai.application.module'
import { BillingApplicationModule } from './billing/application'
import { NotificationApplicationModule } from './notification/application/notification.application.module'
import { UploadApplicationModule } from './upload/application/upload.application.module'

@Module({
  imports: [
    AuthenticationApplicationModule,
    UserApplicationModule,
    AuthorizationApplicationModule,
    NotificationApplicationModule,
    AiApplicationModule,
    UploadApplicationModule,
    BillingApplicationModule,

    BusinessAccountApplicationModule,

    LocationApplicationModule,

    ReviewApplicationModule,

    ReplyApplicationModule,

    AiPromptApplicationModule,

    HistoryApplicationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppApplicationModule {}
