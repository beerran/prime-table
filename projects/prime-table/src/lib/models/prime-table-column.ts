import { PrimeTableColumnLink } from './prime-table-column-link';

export class PrimeTableColumn<T> {
    constructor(
        public displayName: string,
        public name: string,
        public editable = false,
        public reorderable = false,
        public visible = true,
        public render?: (row: T) => any,
        public extraClass?: (row: T) => string,
        public values?: any[]
    ) { }
    hasSelect ? = false;
    [key: string]: any;
    withLink: PrimeTableColumnLink = null;
}
