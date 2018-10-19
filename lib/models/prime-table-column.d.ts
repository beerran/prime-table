import { PrimeTableColumnLink } from './prime-table-column-link';
export declare class PrimeTableColumn<T> {
    displayName: string;
    name: string;
    editable: boolean;
    reorderable: boolean;
    visible: boolean;
    render?: (row: T) => any;
    extraClass?: (row: T) => string;
    values?: any[];
    constructor(displayName: string, name: string, editable?: boolean, reorderable?: boolean, visible?: boolean, render?: (row: T) => any, extraClass?: (row: T) => string, values?: any[]);
    hasSelect?: boolean;
    [key: string]: any;
    withLink: PrimeTableColumnLink;
}
