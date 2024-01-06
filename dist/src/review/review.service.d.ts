import { PrismaService } from '../prisma.service';
import { ReviewDto } from './dto/review.dto';
export declare class ReviewService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: number, dto: ReviewDto, productId: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        rating: number;
        text: string;
        userId: number;
        productId: number;
    }>;
    getAll(): Promise<{
        product: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            slug: string;
            description: string;
            price: number;
            image: string[];
            categoryId: number;
            userId: number;
        };
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        user: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            password: string;
            name: string;
            avatarPath: string;
            phone: string;
        };
        rating: number;
        text: string;
        productId: number;
    }[]>;
    getAverageValueByProductId(productId: number): Promise<{
        rating: number;
    }>;
}
