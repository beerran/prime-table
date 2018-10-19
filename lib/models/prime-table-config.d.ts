import { TreeNode } from 'primeng/api';
import { PrimeTableColumn } from './prime-table-column';
import { PrimeTableContextMenu } from './prime-table-context-menu';
export declare class PrimeTableConfig {
    constructor(preset: 'easy' | 'standard' | 'drilldown' | 'format');
    data: any[] | TreeNode[];
    columns: PrimeTableColumn<any>[];
    drilldown: boolean;
    rowCount: boolean;
    filters: boolean;
    export: boolean;
    sortable: boolean;
    scrollable: boolean;
    addButton: boolean;
    editButton: boolean;
    archiveButton: boolean;
    responsive: boolean;
    autoLayout: boolean;
    rowsShown: number;
    size: 'sm' | 'md' | 'lg';
    columnSettings: {
        resizable: boolean;
        selectable: boolean;
    };
    tooltip: string;
    drilldownProperty: string;
    menu: PrimeTableContextMenu;
    setDrilldownProperty(propertyName: string): void;
    clear(): void;
    setColumns(cols: PrimeTableColumn<any>[]): void;
    setData(data: any[]): void;
    setTreeData(data: any[]): void;
    disable(properties: string[]): void;
    enable(properties: string[]): void;
    private getTreeNodes;
}
