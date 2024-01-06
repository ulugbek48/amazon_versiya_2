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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const return_product_object_1 = require("./return-product.object");
const generate_slug_1 = require("../utils/generate-slug");
const get_all_dto_1 = require("./dto/get-all.dto");
const pagination_service_1 = require("../pagination/pagination.service");
let ProductService = exports.ProductService = class ProductService {
    constructor(prisma, paginationService) {
        this.prisma = prisma;
        this.paginationService = paginationService;
    }
    async getAll(dto = {}) {
        const { sort, searchTerm } = dto;
        const prismaSort = [];
        if (sort === get_all_dto_1.EnumProductSort.LOW_PRICE) {
            prismaSort.push({ price: 'asc' });
        }
        else if (sort === get_all_dto_1.EnumProductSort.HIGH_PRICE) {
            prismaSort.push({ price: 'desc' });
        }
        else if (sort === get_all_dto_1.EnumProductSort.OLDEST) {
            prismaSort.push({ createdAt: 'asc' });
        }
        else {
            prismaSort.push({ createdAt: 'desc' });
        }
        const prismaSearchTermFilter = searchTerm
            ? {
                OR: [
                    {
                        category: {
                            name: {
                                contains: searchTerm,
                                mode: 'insensitive'
                            }
                        }
                    },
                    {
                        name: {
                            contains: searchTerm,
                            mode: 'insensitive'
                        }
                    },
                    {
                        description: {
                            contains: searchTerm,
                            mode: 'insensitive'
                        }
                    }
                ]
            }
            : {};
        const { perPage, skip } = this.paginationService.getPagination(dto);
        const products = await this.prisma.product.findMany({
            where: prismaSearchTermFilter,
            orderBy: prismaSort,
            skip,
            take: perPage
        });
        return {
            products,
            length: await this.prisma.product.count({
                where: prismaSearchTermFilter
            })
        };
    }
    async byId(id) {
        const product = await this.prisma.product.findUnique({
            where: {
                id
            },
            select: return_product_object_1.productReturnObjectFullest
        });
        if (!product) {
            throw new common_1.NotFoundException('Product not found');
        }
        return product;
    }
    async create() {
        const product = await this.prisma.product.create({
            data: {
                description: '',
                name: '',
                price: 0,
                slug: ''
            }
        });
        return product.id;
    }
    async bySlug(slug) {
        const product = await this.prisma.product.findUnique({
            where: {
                slug
            },
            select: return_product_object_1.productReturnObjectFullest
        });
        if (!product) {
            throw new Error('product not found');
        }
        return product;
    }
    async byCategory(categorySlug) {
        const product = await this.prisma.product.findMany({
            where: {
                category: {
                    slug: categorySlug
                }
            },
            select: return_product_object_1.productReturnObjectFullest
        });
        if (!product) {
            throw new Error('product not found');
        }
        return product;
    }
    async getSimilar(id) {
        const currentProduct = await this.byId(id);
        if (!currentProduct)
            throw new common_1.NotFoundException('current product not found!');
        const product = await this.prisma.product.findMany({
            where: {
                category: {
                    name: currentProduct.category.name
                },
                NOT: {
                    id: currentProduct.id
                }
            },
            orderBy: {
                createdAt: 'desc'
            },
            select: return_product_object_1.productReturnObject
        });
        return product;
    }
    async update(id, dto) {
        const { description, image, price, name, categoryId } = dto;
        return this.prisma.product.update({
            where: {
                id
            },
            data: {
                description,
                image,
                price,
                name,
                slug: (0, generate_slug_1.generateSlug)(dto.name),
                category: {
                    connect: {
                        id: categoryId
                    }
                }
            }
        });
    }
    async delete(id) {
        return this.prisma.product.delete({
            where: {
                id
            }
        });
    }
};
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        pagination_service_1.PaginationService])
], ProductService);
//# sourceMappingURL=product.service.js.map