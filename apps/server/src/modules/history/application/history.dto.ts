import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class HistoryCreateDto {
  @IsString()
  @IsNotEmpty()
  exportStatus: string

  @IsString()
  @IsOptional()
  reviewId?: string

  @IsString()
  @IsOptional()
  replyId?: string

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

export class HistoryUpdateDto {
  @IsString()
  @IsOptional()
  exportStatus?: string

  @IsString()
  @IsOptional()
  reviewId?: string

  @IsString()
  @IsOptional()
  replyId?: string

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
