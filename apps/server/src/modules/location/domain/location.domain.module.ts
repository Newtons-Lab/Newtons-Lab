import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { LocationDomainFacade } from './location.domain.facade'
import { Location } from './location.model'

@Module({
  imports: [TypeOrmModule.forFeature([Location]), DatabaseHelperModule],
  providers: [LocationDomainFacade, LocationDomainFacade],
  exports: [LocationDomainFacade],
})
export class LocationDomainModule {}
