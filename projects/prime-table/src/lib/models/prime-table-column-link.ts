export class PrimeTableColumnLink {
    constructor(
        public staticPath: string,
        public dynamic?: string,
        public methodCall: (row, col) => any = null
    ) { }
}
