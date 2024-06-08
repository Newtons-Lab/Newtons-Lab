import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { AiPromptDomainFacade } from './aiPrompt.domain.facade'
import { AiPrompt } from './aiPrompt.model'

@Module({
  imports: [TypeOrmModule.forFeature([AiPrompt]), DatabaseHelperModule],
  providers: [AiPromptDomainFacade, AiPromptDomainFacade],
  exports: [AiPromptDomainFacade],
})
export class AiPromptDomainModule {}
