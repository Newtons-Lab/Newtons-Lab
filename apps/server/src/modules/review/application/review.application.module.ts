import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { ReviewDomainModule } from '../domain'
import { ReviewController } from './review.controller'

import { LocationDomainModule } from '../../../modules/location/domain'

import { ReviewByLocationController } from './reviewByLocation.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    ReviewDomainModule,

    LocationDomainModule,
  ],
  controllers: [ReviewController, ReviewByLocationController],
  providers: [],
})
export class ReviewApplicationModule {}
