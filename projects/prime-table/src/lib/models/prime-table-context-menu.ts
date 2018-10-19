import { MenuItem, TreeNode } from 'primeng/api';

export class PrimeTableContextMenu {
    constructor(
        public enabled: boolean,
        public node: TreeNode | any,
        public items: MenuItem[]
    ) { }
}
