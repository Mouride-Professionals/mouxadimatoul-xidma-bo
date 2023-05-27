export type Pagination<T> = {
    content: T[];
    empty: boolean;
    first: boolean;
    last: boolean;
    numberOfElements: number;
    size: number;
    totalElements: number;
    totalPages: number;
};
