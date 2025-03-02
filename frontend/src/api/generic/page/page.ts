import { PageInfo } from "./page-info";

export interface Page<T> {
    content: T[],
    page: PageInfo
};