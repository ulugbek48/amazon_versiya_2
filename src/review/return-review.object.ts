import { Prisma } from '@prisma/client'
import { returnUser } from '../user/return-user.object'

export const returnReviewObject: Prisma.ReviewSelect = {
	user: {
		select: returnUser
	},
	createdAt: true,
	text: true,
	rating: true,
	id: true
}
