import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { ReplyDomainFacade } from './reply.domain.facade'
import { Reply } from './reply.model'

@Module({
  imports: [TypeOrmModule.forFeature([Reply]), DatabaseHelperModule],
  providers: [ReplyDomainFacade, ReplyDomainFacade],
  exports: [ReplyDomainFacade],
})
export class ReplyDomainModule {}
