import { PaginotionDto } from '../../pagination/dto/pagination.dto';
export declare enum EnumProductSort {
    HIGH_PRICE = "high-price",
    LOW_PRICE = "low-price",
    NEWEST = "newest",
    OLDEST = "oldest"
}
export declare class GetAllProductDto extends PaginotionDto {
    sort?: EnumProductSort;
    searchTerm?: string;
}
