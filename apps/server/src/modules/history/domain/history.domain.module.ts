import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { HistoryDomainFacade } from './history.domain.facade'
import { History } from './history.model'

@Module({
  imports: [TypeOrmModule.forFeature([History]), DatabaseHelperModule],
  providers: [HistoryDomainFacade, HistoryDomainFacade],
  exports: [HistoryDomainFacade],
})
export class HistoryDomainModule {}
