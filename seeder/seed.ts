import { faker } from '@faker-js/faker'
import { PrismaClient, Product } from '@prisma/client'
import * as dotenv from 'dotenv'
import { generateSlug } from '../src/utils/generate-slug'
import { getRandomNumber } from '../src/utils/random-number'
import { Options } from '@nestjs/common'

dotenv.config()
const prisma = new PrismaClient()

const createProducts = async (quantity: number) => {
	const products: Product[] = []

	for (let i = 0; i < quantity; i++) {
		const productName = faker.commerce.productName()
		const categoryName = faker.commerce.department()

		const product = await prisma.product.create({
			data: {
				name: productName,
				slug: generateSlug(productName).toLowerCase(),
				description: faker.commerce.productDescription(),
				price: +faker.commerce.price(10, 999, 0),
				image: Array.from({ length: getRandomNumber(2, 6) }).map(() =>
					faker.image.url({ width: 500, height: 500 })
				),
				category: {
					create: {
						name: categoryName,
						slug: generateSlug(categoryName).toLowerCase()
					}
				},
				reviews: {
					create: [
						{
							rating: faker.datatype.number({ min: 1, max: 9 }),
							text: faker.lorem.paragraph(),
							user: {
								connect: {
									id: 5
								}
							}
						},
						{
							rating: faker.datatype.number({ min: 1, max: 9 }),
							text: faker.lorem.paragraph(),
							user: {
								connect: {
									id: 5
								}
							}
						}
					]
				}
			}
		})
		products.push(product)
	}
	console.log(`Create ${products.length} products`)
}

// const createProducts = async (quantity: number) => {
// 	const products: Product[] = []

// 	for (let i = 0; i < quantity; i++) {
// 		let productName = faker.commerce.productName()
// 		const categoryName = faker.commerce.department()

// 		let existingProduct = await prisma.product.findFirst({
// 			where: {
// 				name: productName
// 			}
// 		})

// 		// If the name already exists, generate a new one
// 		while (existingProduct) {
// 			productName = faker.commerce.productName()
// 			existingProduct = await prisma.product.findFirst({
// 				where: {
// 					name: productName
// 				}
// 			})
// 		}

// 		const product = await prisma.product.create({
// 			data: {
// 				name: productName,
// 				slug: generateSlug(productName),
// 				description: faker.commerce.productDescription(),
// 				price: +faker.commerce.price(10, 999, 0),
// 				image: Array.from({ length: getRandomNumber(2, 6) }).map(() =>
// 					faker.image.url()
// 				),
// 				category: {
// 					create: {
// 						name: categoryName,
// 						slug: generateSlug(categoryName)
// 					}
// 				},
// 				reviews: {
// 					create: [
// 						{
// 							rating: faker.datatype.number({ min: 1, max: 9 }),
// 							text: faker.lorem.paragraph(),
// 							user: {
// 								connect: {
// 									id: 5
// 								}
// 							}
// 						},
// 						{
// 							rating: faker.datatype.number({ min: 1, max: 9 }),
// 							text: faker.lorem.paragraph(),
// 							user: {
// 								connect: {
// 									id: 5
// 								}
// 							}
// 						}
// 					]
// 				}
// 			}
// 		})
// 		products.push(product)
// 	}
// 	console.log(`Create ${products.length} products`)
// }

async function main() {
	console.log('Start seeding ...')
	await createProducts(10)
}

main()
	.catch(e => console.error(e))
	.finally(async () => {
		await prisma.$disconnect()
	})
