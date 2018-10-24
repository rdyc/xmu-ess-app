import { IBasePagination } from './IBasePagination';

export interface IBaseMetadata {
    size: number;
    total: number;
    paginate: IBasePagination | null;
}