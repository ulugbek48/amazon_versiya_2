import { IsOptional, IsString } from 'class-validator'

export class PaginotionDto {
	@IsOptional()
	@IsString()
	page?: string

	@IsOptional()
	@IsString()
	perPage?: string
}
