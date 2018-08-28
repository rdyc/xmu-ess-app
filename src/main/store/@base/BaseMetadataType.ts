interface PaginateType {
    current: number;
    total: number;
    next: boolean;
    previous: boolean;
}

export interface BaseMetadataType {
    size: number;
    total: number;
    paginate: PaginateType | null;
}