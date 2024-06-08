import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { BusinessAccountDomainModule } from '../domain'
import { BusinessAccountController } from './businessAccount.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { BusinessAccountByUserController } from './businessAccountByUser.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    BusinessAccountDomainModule,

    UserDomainModule,
  ],
  controllers: [BusinessAccountController, BusinessAccountByUserController],
  providers: [],
})
export class BusinessAccountApplicationModule {}
