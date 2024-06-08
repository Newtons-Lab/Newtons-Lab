import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class ReplyCreateDto {
  @IsString()
  @IsNotEmpty()
  replyText: string

  @IsString()
  @IsNotEmpty()
  publishedDate: string

  @IsBoolean()
  @IsNotEmpty()
  isAiGenerated: boolean

  @IsString()
  @IsOptional()
  reviewId?: string

  @IsString()
  @IsOptional()
  dateCreated?: string

  @IsString()
  @IsOptional()
  dateDeleted?: string

  @IsString()
  @IsOptional()
  dateUpdated?: string
}

export class ReplyUpdateDto {
  @IsString()
  @IsOptional()
  replyText?: string

  @IsString()
  @IsOptional()
  publishedDate?: string

  @IsBoolean()
  @IsOptional()
  isAiGenerated?: boolean

  @IsString()
  @IsOptional()
  reviewId?: string

  @IsString()
  @IsOptional()
  dateCreated?: string

  @IsString()
  @IsOptional()
  dateDeleted?: string

  @IsString()
  @IsOptional()
  dateUpdated?: string
}
