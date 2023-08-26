export interface Pageable<T> {
    content: T[];
    totalPages: number;
    totalElements: number;
    size: number;
    // eslint-disable-next-line id-blacklist
    number: number;
    numberOfElements: number;
    last: boolean;
    first: boolean;
    empty: boolean;
}
