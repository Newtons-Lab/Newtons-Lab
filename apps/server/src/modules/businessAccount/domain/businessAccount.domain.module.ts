import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { BusinessAccountDomainFacade } from './businessAccount.domain.facade'
import { BusinessAccount } from './businessAccount.model'

@Module({
  imports: [TypeOrmModule.forFeature([BusinessAccount]), DatabaseHelperModule],
  providers: [BusinessAccountDomainFacade, BusinessAccountDomainFacade],
  exports: [BusinessAccountDomainFacade],
})
export class BusinessAccountDomainModule {}
