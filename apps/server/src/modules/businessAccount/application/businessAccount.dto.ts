import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class BusinessAccountCreateDto {
  @IsString()
  @IsNotEmpty()
  googleAccountId: string

  @IsString()
  @IsNotEmpty()
  accessToken: string

  @IsString()
  @IsNotEmpty()
  refreshToken: string

  @IsString()
  @IsOptional()
  userId?: string

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

export class BusinessAccountUpdateDto {
  @IsString()
  @IsOptional()
  googleAccountId?: string

  @IsString()
  @IsOptional()
  accessToken?: string

  @IsString()
  @IsOptional()
  refreshToken?: string

  @IsString()
  @IsOptional()
  userId?: string

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
