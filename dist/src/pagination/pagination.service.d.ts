import { PaginotionDto } from './dto/pagination.dto';
export declare class PaginationService {
    getPagination(dto: PaginotionDto, defaultPerPage?: number): {
        perPage: number;
        skip: number;
    };
}
