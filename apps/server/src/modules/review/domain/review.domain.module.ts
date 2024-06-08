import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { ReviewDomainFacade } from './review.domain.facade'
import { Review } from './review.model'

@Module({
  imports: [TypeOrmModule.forFeature([Review]), DatabaseHelperModule],
  providers: [ReviewDomainFacade, ReviewDomainFacade],
  exports: [ReviewDomainFacade],
})
export class ReviewDomainModule {}
