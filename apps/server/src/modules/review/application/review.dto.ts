import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class ReviewCreateDto {
  @IsString()
  @IsNotEmpty()
  reviewText: string

  @IsString()
  @IsNotEmpty()
  reviewDate: string

  @IsString()
  @IsNotEmpty()
  status: string

  @IsString()
  @IsOptional()
  locationId?: string

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

export class ReviewUpdateDto {
  @IsString()
  @IsOptional()
  reviewText?: string

  @IsString()
  @IsOptional()
  reviewDate?: string

  @IsString()
  @IsOptional()
  status?: string

  @IsString()
  @IsOptional()
  locationId?: string

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
