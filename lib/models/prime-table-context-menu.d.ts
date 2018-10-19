import { MenuItem, TreeNode } from 'primeng/api';
export declare class PrimeTableContextMenu {
    enabled: boolean;
    node: TreeNode | any;
    items: MenuItem[];
    constructor(enabled: boolean, node: TreeNode | any, items: MenuItem[]);
}
