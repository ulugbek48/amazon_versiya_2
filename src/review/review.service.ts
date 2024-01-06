import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { returnReviewObject } from './return-review.object'
import { ReviewDto } from './dto/review.dto'

@Injectable()
export class ReviewService {
	constructor(private prisma: PrismaService) {}

	// async byId(id: number) {
	// 	const review = await this.prisma.review.findUnique({
	// 		where: {
	// 			id
	// 		},
	// 		select: returnReviewObject
	// 	})
	// 	if (!review) {
	// 		throw new NotFoundException('review not found')
	// 	}
	// 	return review
	// }

	async create(userId: number, dto: ReviewDto, productId: number) {
		return this.prisma.review.create({
			data: {
				...dto,
				product: {
					connect: {
						id: productId
					}
				},
				user: {
					connect: {
						id: userId
					}
				}
			}
		})
	}

	// async bySlug(slug: string) {
	// 	const review = await this.prisma.review.findUnique({
	// 		where: {
	// 			slug
	// 		},
	// 		select: returnReviewObject
	// 	})
	// 	if (!review) {
	// 		throw new Error('review not found')
	// 	}
	// 	return review
	// }

	async getAll() {
		return this.prisma.review.findMany({
			orderBy: {
				createdAt: 'desc'
			},
			select: returnReviewObject
		})
	}

	// async update(id: number, dto: ReviewDto) {
	// 	return this.prisma.review.update({
	// 		where: {
	// 			id
	// 		},
	// 		data: {
	// 			name: dto.name,
	// 			slug: generateSlug(dto.name)
	// 		}
	// 	})
	// }

	async getAverageValueByProductId(productId: number) {
		return this.prisma.review
			.aggregate({
				where: {
					productId
				},
				_avg: { rating: true }
			})
			.then(data => data._avg)
	}
}
