import { EventEmitter, OnInit } from '@angular/core';
import { SelectItem, TreeNode } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';
import { PrimeTableConfig } from './models/prime-table-config';
import { PrimeTableColumn } from './models/prime-table-column';
export declare class PrimeTableComponent implements OnInit {
    _config: PrimeTableConfig;
    dataLoaded: BehaviorSubject<boolean>;
    showFilters: boolean;
    hasReorderableColumn: boolean;
    rowCount: {
        options: SelectItem[];
        selected: number;
    };
    selectedColumns: any[];
    selectedRows: any[];
    screenHeight: string;
    private columnsLoaded;
    config: PrimeTableConfig;
    data: any[] | TreeNode[];
    columns: PrimeTableColumn<any>[];
    add: EventEmitter<any>;
    edit: EventEmitter<any>;
    archive: EventEmitter<any>;
    onResize(event?: any): void;
    constructor();
    ngOnInit(): void;
    private setupData;
    private setupColumns;
    rowReordered: (event: {
        dragIndex: number;
        dropIndex: number;
    }) => void;
    toggleFilters: () => boolean;
    getCellValue(row: any, col: PrimeTableColumn<any>): any;
    getLinkValue(row: any, col: PrimeTableColumn<any>): string;
    private resolveKey;
}
