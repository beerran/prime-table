import { PrimeTableColumn } from './prime-table-column';

export class PrimeTableSelect {
    constructor(
        public label: string,
        public values: any[],
        public placeholder = 'Select',
        public change: (event, row, col: PrimeTableColumn<any>) => any = null
    ) { }
}
