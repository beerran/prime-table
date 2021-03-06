import { TreeNode } from 'primeng/api';

import { PrimeTableColumn } from './prime-table-column';
import { PrimeTableContextMenu } from './prime-table-context-menu';

export class PrimeTableConfig {
    constructor(
        preset: 'none' | 'easy' | 'standard' | 'drilldown' | 'format' | 'expandable'
    ) {
        switch (preset) {
            case 'easy':
                this.addButton = true;
                this.editButton = true;
                this.archiveButton.enabled = true;
                this.export = false;
                this.size = 'sm';
                this.scrollable = false;
            break;
            case 'drilldown':
                this.drilldown = true;
                this.scrollable = false;
            break;
            case 'expandable':
                this.addButton = true;
                this.scrollable = true;
                this.expandable = {
                    key: 'id',
                    enabled: true,
                    icon: {
                        collapsed: 'fa-chevron-right',
                        expanded: 'expanded',
                        append: true
                    }
                };
                this.rowsShown = 10;
                break;
            case 'format':
                this.rowCount = false;
                this.export = false;
                this.columnSettings.selectable = false;
                this.autoLayout = false;
            break;
            case 'standard':
                this.editButton = true;
                this.addButton = true;
                this.scrollable = true;
                this.rowsShown = 10;
                this.export = false;
            break;
            case 'none':
            default:
            break;
        }
    }
    public data: any[] | TreeNode[];
    public columns: PrimeTableColumn<any>[];
    public drilldown = false;

    public rowCount = true;
    public filters = true;
    public export = true;
    public sortable = true;
    public scrollable = false;
    public addButton = false;
    public editButton = false;
    public archiveButton = {
        enabled: false,
        archiveText: 'Archive',
        restoreText: 'Restore'
    };
    public responsive = true;
    public autoLayout = true;
    public rowsShown: number = null;
    public size: 'sm' | 'md' | 'lg' = 'md';
    public tooltip: string = null;
    public drilldownProperty: string = null;
    public onArchive: (item: any) => void = null;
    public onCellEdit: (item: any, editedField: string) => void = null;
    public rowClasses: {
        [key: string]: (row) => boolean
    };

    public orderBy: {
        key: string,
        type: 'asc' | 'desc'
    } = null;
    public expandable: {
        key: string,
        enabled: boolean,
        icon: {
            collapsed: string,
            expanded: string,
            append: boolean
        }
      } = {
          key: null,
          enabled: false,
          icon: {
            collapsed: 'fa-chevron-right',
            expanded: 'expanded',
            append: true
        }
    };
    public columnSettings = {
        resizable: false,
        selectable: false
    };
    public menu: PrimeTableContextMenu = {
        enabled: false,
        node: null,
        items: []
    };

    public selectableRows = {
        enabled: false,
        multiple: false,
        clearText: 'X',
        buttonText: 'Use selected'
    };

    public setDrilldownProperty(propertyName: string) {
        this.drilldownProperty = propertyName;
    }

    public clear() {
        this.data = [];
        this.menu.node = null;
    }

    public setColumns(cols: PrimeTableColumn<any>[]) {
        cols.forEach(col => col.field = col.name);
        this.columns = [...cols];
    }
    public setData(data: any[]) {
        this.data = [...data];
    }
    public setTreeData(data: any[]) {
        const treeNodeData = this.getTreeNodes(data, this.drilldownProperty);
        this.data = [...treeNodeData];
    }

    public disable(properties: string[]) {
        properties.forEach(p => this[p] = false);
    }

    public enable(properties: string[]) {
        properties.forEach(p => this[p] = true);
    }

    private getTreeNodes(data: any[], key: string): TreeNode[] {
        let transformed: TreeNode[] = [];

        data.map(item => {
            const treeNode: TreeNode = { data: item };
            if (item.hasOwnProperty(key) && item[key] && item[key].length > 0) {
                treeNode.children = this.getTreeNodes(item[key], key);
            }
            transformed = [...transformed, treeNode];
        });

        return transformed;
    }
}
