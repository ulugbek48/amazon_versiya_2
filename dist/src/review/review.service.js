"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const return_review_object_1 = require("./return-review.object");
let ReviewService = exports.ReviewService = class ReviewService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, dto, productId) {
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
        });
    }
    async getAll() {
        return this.prisma.review.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            select: return_review_object_1.returnReviewObject
        });
    }
    async getAverageValueByProductId(productId) {
        return this.prisma.review
            .aggregate({
            where: {
                productId
            },
            _avg: { rating: true }
        })
            .then(data => data._avg);
    }
};
exports.ReviewService = ReviewService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ReviewService);
//# sourceMappingURL=review.service.js.map