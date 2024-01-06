import { PrismaService } from '../prisma.service';
import { UserService } from '../user/user.service';
export declare class StatisticsService {
    private prisma;
    private userService;
    constructor(prisma: PrismaService, userService: UserService);
    getMain(userId: number): Promise<{
        name: string;
        value: number;
    }[]>;
}
