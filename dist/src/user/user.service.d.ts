import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';
import { UserDto } from './dto/user.dto';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    byId(id: number, selectObject?: Prisma.UserSelect): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        reviews: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            rating: number;
            text: string;
            userId: number;
            productId: number;
        }[];
        _count: {
            orders: number;
            favorites: number;
            reviews: number;
        };
        email: string;
        password: string;
        avatarPath: string;
        phone: string;
        orders: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.EnumOrderItemStatus;
            userId: number;
        }[];
        favorites: {
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
        }[];
    }>;
    updateProfile(id: number, dto: UserDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        password: string;
        name: string;
        avatarPath: string;
        phone: string;
    }>;
    toggleFavorite(userId: number, productId: number): Promise<{
        message: string;
    }>;
}
