interface PaginationType {
    next: boolean;
    previous: boolean;
}

export interface BaseMetadataType {
    pagination: PaginationType;
}