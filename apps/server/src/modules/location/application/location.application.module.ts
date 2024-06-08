import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { LocationDomainModule } from '../domain'
import { LocationController } from './location.controller'

import { BusinessAccountDomainModule } from '../../../modules/businessAccount/domain'

import { LocationByBusinessAccountController } from './locationByBusinessAccount.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    LocationDomainModule,

    BusinessAccountDomainModule,
  ],
  controllers: [LocationController, LocationByBusinessAccountController],
  providers: [],
})
export class LocationApplicationModule {}
