/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PrimeTableConfig } from './models/prime-table-config';
export class PrimeTableComponent {
    constructor() {
        this._config = new PrimeTableConfig('standard');
        this.dataLoaded = new BehaviorSubject(false);
        this.showFilters = false;
        this.hasReorderableColumn = false;
        this.rowCount = {
            options: [
                { label: 'All', value: null },
                { label: '5', value: 5 },
                { label: '10', value: 10 },
                { label: '25', value: 25 },
                { label: '50', value: 50 },
                { label: '100', value: 100 }
            ],
            selected: null
        };
        this.screenHeight = '0px';
        this.columnsLoaded = new BehaviorSubject(false);
        this.add = new EventEmitter();
        this.edit = new EventEmitter();
        this.archive = new EventEmitter();
        this.rowReordered = (event) => {
            if (event.dropIndex >= event.dragIndex) {
                // Bug in PrimeNg, when dragging up/"on top" of another row it gets the wrong index
                event.dropIndex--;
            }
            /** @type {?} */
            const reorderableColumn = this._config.columns.find(col => col.reorderable === true);
            this._config.data[event.dropIndex][reorderableColumn.name] = event.dropIndex + 1;
            if (event.dropIndex > event.dragIndex) {
                for (let i = event.dragIndex; i < event.dropIndex; i++) {
                    this._config.data[i][reorderableColumn.name] = i + 1;
                }
            }
            else {
                for (let i = event.dropIndex; i <= event.dragIndex; i++) {
                    this._config.data[i][reorderableColumn.name] = i + 1;
                }
            }
        };
        this.toggleFilters = () => this.showFilters = !this.showFilters;
        this.resolveKey = (key, obj) => {
            return key.split('.').reduce((prev, curr) => prev ? prev[curr] : null, obj);
        };
        this.onResize();
    }
    /**
     * @param {?} input
     * @return {?}
     */
    set config(input) {
        if (input) {
            this._config = input;
            this.setupColumns();
            this.setupData();
            this.rowCount.selected = this._config.rowsShown;
        }
    }
    /**
     * @param {?} data
     * @return {?}
     */
    set data(data) {
        if (data) {
            this._config.drilldown ? this._config.setTreeData(data)
                : this._config.setData(data);
            this.setupData();
        }
    }
    /**
     * @param {?} columns
     * @return {?}
     */
    set columns(columns) {
        this._config.setColumns(columns);
        this.setupColumns();
    }
    /**
     * @param {?=} event
     * @return {?}
     */
    onResize(event) {
        this.screenHeight = (window.innerHeight - 350) + 'px';
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.hasReorderableColumn) {
            // ToDo: Fix for drilldown tables
            this.dataLoaded.subscribe(dataLoaded => {
                if (dataLoaded) {
                    /** @type {?} */
                    const reorderableColumn = this._config.columns.find(col => col.reorderable === true);
                    this._config.sortable = false;
                    (/** @type {?} */ (this._config.data)).sort((item1, item2) => item1[reorderableColumn.name] - item2[reorderableColumn.name]);
                }
            });
        }
    }
    /**
     * @return {?}
     */
    setupData() {
        this.dataLoaded.next(true);
    }
    /**
     * @return {?}
     */
    setupColumns() {
        this.selectedColumns = this._config.columns.filter(col => col.visible !== false);
        this.hasReorderableColumn = this._config.columns.findIndex(col => col.reorderable === true) >= 0;
        this._config.columns.forEach(col => col.hasSelect = col.values && col.values.length > 1);
        this.columnsLoaded.next(true);
    }
    /**
     * @param {?} row
     * @param {?} col
     * @return {?}
     */
    getCellValue(row, col) {
        if (col.render) {
            return col.render(row);
        }
        else {
            return this.resolveKey(col.name, row);
        }
    }
    /**
     * @param {?} row
     * @param {?} col
     * @return {?}
     */
    getLinkValue(row, col) {
        /** @type {?} */
        const dynamicPath = col.withLink.dynamic ? '/' + this.resolveKey(col.withLink.dynamic, row) : '';
        return col.withLink.staticPath + dynamicPath;
    }
}
PrimeTableComponent.decorators = [
    { type: Component, args: [{
                selector: 'b-prime-table',
                template: "<p-contextMenu #cm appendTo=\"body\" [model]=\"_config.menu.items\"></p-contextMenu>\n\n\n<p-treeTable *ngIf=\"_config.drilldown\" [value]=\"_config.data\" [(contextMenuSelection)]=\"_config.menu.node\" [contextMenu]=\"cm\" [columns]=\"selectedColumns\" class=\"table\" [class.table-sm]=\"_config.size === 'sm'\">\n    <ng-template pTemplate=\"header\" let-columns>\n        <tr>\n            <th *ngFor=\"let col of columns\">{{col.displayName || col.name}}</th>\n        </tr>\n    </ng-template>\n    <ng-template pTemplate=\"body\" let-rowNode let-rowData=\"rowData\" let-columns=\"columns\">\n        <tr [ttContextMenuRow]=\"rowNode\" tooltipPosition=\"top\" [pTooltip]=\"_config.tooltip ? rowData[_config.tooltip] : null\">\n            <td *ngFor=\"let col of columns; let i = index\" [ngClass]=\"col.extraClass ? col.extraClass(rowData) : ''\">\n                <p-treeTableToggler [rowNode]=\"rowNode\" *ngIf=\"i === 0\"></p-treeTableToggler>\n                <span>{{rowData[col.name]}}</span>\n            </td>\n        </tr>\n    </ng-template>\n</p-treeTable>\n<p-table [responsive]=\"_config.responsive\" [autoLayout]=\"_config.autoLayout\" (onRowReorder)=\"rowReordered($event)\" *ngIf=\"!_config.drilldown\" #dt [(contextMenuSelection)]=\"_config.menu.node\" [contextMenu]=\"cm\" [resizableColumns]=\"_config.columnSettings.resizable\"\n    selectionMode=\"multiple\" [(selection)]=\"selectedRows\" [scrollHeight]=\"screenHeight\" [paginator]=\"rowCount.selected ? _config.data.length > rowCount.selected : false\" [rows]=\"rowCount.selected\" class=\"table\" [class.table-sm]=\"_config.size === 'sm'\" [value]=\"_config.data\"\n    [columns]=\"selectedColumns\">\n    <ng-template pTemplate=\"caption\">\n        <div class=\"row\">\n            <div class=\"col-6 col-md-2\" *ngIf=\"_config.rowCount\">\n                <p-dropdown class=\"pull-left\" [options]=\"rowCount.options\" [(ngModel)]=\"rowCount.selected\"></p-dropdown>\n            </div>\n            <div class=\"col-6 col-md-3\" *ngIf=\"_config.columnSettings.selectable\" [class.col-md-5]=\"!_config.rowCount\">\n                <p-multiSelect [options]=\"_config.columns\" [(ngModel)]=\"selectedColumns\" optionLabel=\"displayName\" selectedItemsLabel=\"{0} columns selected\" [style]=\"{minWidth: '200px'}\" defaultLabel=\"Choose Columns\"></p-multiSelect>\n            </div>\n            <div class=\"col-12 col-md-7\" [class.col-md-10]=\"!_config.columnSettings.selectable\" [class.col-md-12]=\"!_config.rowCount && !_config.columnSettings.selectable\">\n                <button *ngIf=\"_config.filters\" class=\"btn btn-sm btn-dark d-inline\" type=\"button\" (click)=\"toggleFilters()\">Filters</button>\n                <button *ngIf=\"_config.export\" class=\"btn btn-sm btn-dark mx-2 d-inline\" type=\"button\" pButton iconPos=\"left\" label=\"All Data\" (click)=\"dt.exportCSV()\">Export</button>\n                <button *ngIf=\"_config.addButton\" class=\"btn btn-sm btn-success ml-2 pull-right\" type=\"button\" (click)=\"add.emit(true)\">Add new</button>\n                <ng-content select=\".table-extra-content\"></ng-content>\n            </div>\n        </div>\n        <div class=\"row\" *ngIf=\"showFilters\">\n            <div class=\"col\">\n                <input type=\"text\" style=\"width:auto\" class=\"form-control form-control-sm d-inline\" pInputText size=\"50\" placeholder=\"Global Filter\" (input)=\"dt.filterGlobal($event.target.value, 'contains')\">\n            </div>\n        </div>\n    </ng-template>\n    <ng-template pTemplate=\"header\" let-columns>\n        <tr *ngIf=\"_config.sortable; else unsortableRow\">\n            <th *ngIf=\"hasReorderableColumn\" style=\"width:3rem\"></th>\n            <th [pSortableColumn]=\"col.name\" *ngFor=\"let col of columns\" pResizableColumn>\n                {{col.displayName || col.name}}\n                <p-sortIcon [field]=\"col.name\"></p-sortIcon>\n            </th>\n            <th *ngIf=\"_config.editButton\">Edit</th>\n            <th *ngIf=\"_config.archiveButton\">Archive</th>\n        </tr>\n        <ng-template #unsortableRow>\n            <tr>\n                <th *ngIf=\"hasReorderableColumn\" style=\"width:3rem\"></th>\n                <th *ngFor=\"let col of columns\" pResizableColumn>\n                    {{col.displayName || col.name}}\n                </th>\n                <th *ngIf=\"_config.editButton\">Edit</th>\n                <th *ngIf=\"_config.archiveButton\">Archive</th>\n            </tr>\n        </ng-template>\n    </ng-template>\n\n    <ng-template pTemplate=\"body\" let-row let-columns=\"columns\" let-index=\"rowIndex\">\n        <tr [pContextMenuRow]=\"row\" [pSelectableRow]=\"row\" [pReorderableRow]=\"index\" (onDrop)=\"rowReordered($event)\">\n            <td *ngIf=\"hasReorderableColumn\">\n                <i class=\"fa fa-bars move\" pReorderableRowHandle></i>\n            </td>\n            <td *ngFor=\"let col of columns\" [class.with-select]=\"col.hasSelect\" pEditableColumn class=\"ui-resizable-column\" [ngClass]=\"col.extraClass ? col.extraClass(row) : ''\">\n                <p-cellEditor *ngIf=\"col.editable; else onlyOutput\">\n                    <ng-template pTemplate=\"input\">\n                        <input type=\"text\" class=\"form-control form-control-sm\" [(ngModel)]=\"row[col.field]\" />\n                    </ng-template>\n                    <ng-template pTemplate=\"output\">\n                        <span>{{getCellValue(row, col)}}</span>\n                    </ng-template>\n                </p-cellEditor>\n                <ng-template #onlyOutput>\n                    <div *ngIf=\"col.hasSelect; else textInput\">\n                        <p-dropdown class=\"w-auto mw-100\" [options]=\"col.values\" placeholder=\"Select\" optionLabel=\"name\" [filter]=\"true\" filterBy=\"value.name\" [(ngModel)]=\"row[col.name]\">\n                        </p-dropdown>\n                    </div>\n                    <ng-template #textInput>\n                        <a *ngIf=\"col.withLink; else spanOnly\" routerLink=\"/{{getLinkValue(row, col)}}\">{{getCellValue(row, col)}}</a>\n                        <ng-template #spanOnly><span>{{getCellValue(row, col)}}</span></ng-template>\n                    </ng-template>\n                </ng-template>\n            </td>\n            <td *ngIf=\"_config.editButton\"><button class=\"btn btn-xs btn-dark\" (click)=\"edit.emit(row)\">Edit</button></td>\n            <td *ngIf=\"_config.archiveButton\"><button class=\"btn btn-xs\" [ngClass]=\"row.archived ? 'btn-dark' : 'btn-danger'\" (click)=\"archive.emit(row)\">{{row.archived ? 'Restore' : 'Archive'}}</button></td>\n        </tr>\n    </ng-template>\n</p-table>\n\n<div *ngIf=\"(dataLoaded | async) === false\">Loading data...</div>"
            }] }
];
/** @nocollapse */
PrimeTableComponent.ctorParameters = () => [];
PrimeTableComponent.propDecorators = {
    config: [{ type: Input, args: ['config',] }],
    data: [{ type: Input, args: ['data',] }],
    columns: [{ type: Input, args: ['columns',] }],
    add: [{ type: Output }],
    edit: [{ type: Output }],
    archive: [{ type: Output }],
    onResize: [{ type: HostListener, args: ['window:resize', ['$event'],] }]
};
if (false) {
    /** @type {?} */
    PrimeTableComponent.prototype._config;
    /** @type {?} */
    PrimeTableComponent.prototype.dataLoaded;
    /** @type {?} */
    PrimeTableComponent.prototype.showFilters;
    /** @type {?} */
    PrimeTableComponent.prototype.hasReorderableColumn;
    /** @type {?} */
    PrimeTableComponent.prototype.rowCount;
    /** @type {?} */
    PrimeTableComponent.prototype.selectedColumns;
    /** @type {?} */
    PrimeTableComponent.prototype.selectedRows;
    /** @type {?} */
    PrimeTableComponent.prototype.screenHeight;
    /** @type {?} */
    PrimeTableComponent.prototype.columnsLoaded;
    /** @type {?} */
    PrimeTableComponent.prototype.add;
    /** @type {?} */
    PrimeTableComponent.prototype.edit;
    /** @type {?} */
    PrimeTableComponent.prototype.archive;
    /** @type {?} */
    PrimeTableComponent.prototype.rowReordered;
    /** @type {?} */
    PrimeTableComponent.prototype.toggleFilters;
    /** @type {?} */
    PrimeTableComponent.prototype.resolveKey;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpbWUtdGFibGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vcHJpbWUtdGFibGUvIiwic291cmNlcyI6WyJsaWIvcHJpbWUtdGFibGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUU3RixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBUS9ELE1BQU07SUF5REo7dUJBeERpQixJQUFJLGdCQUFnQixDQUFDLFVBQVUsQ0FBQzswQkFDN0IsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDOzJCQUNsQyxLQUFLO29DQUNJLEtBQUs7d0JBQzBCO1lBQzNELE9BQU8sRUFBRTtnQkFDUCxFQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBQztnQkFDM0IsRUFBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUM7Z0JBQ3RCLEVBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFDO2dCQUN4QixFQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBQztnQkFDeEIsRUFBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUM7Z0JBQ3hCLEVBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFDO2FBQzNCO1lBQ0QsUUFBUSxFQUFFLElBQUk7U0FDZjs0QkFJcUIsS0FBSzs2QkFFSCxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUM7bUJBMkIzQyxJQUFJLFlBQVksRUFBTztvQkFDdEIsSUFBSSxZQUFZLEVBQU87dUJBQ3BCLElBQUksWUFBWSxFQUFPOzRC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QUUsQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQyxNQUFNLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDekYsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Ozs7Ozs7SUF1QmhDLFlBQVksQ0FBQyxHQUFRLEVBQUUsR0FBMEI7UUFDL0MsSUFBSSxHQUFHLENBQUMsTUFBTSxFQUFFO1lBQ2QsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3hCO2FBQU07WUFDTCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztTQUN2QztLQUNGOzs7Ozs7SUFFRCxZQUFZLENBQUMsR0FBUSxFQUFFLEdBQTBCOztRQUMvQyxNQUFNLFdBQVcsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUNqRyxPQUFPLEdBQUcsQ0FBQyxRQUFRLENBQUMsVUFBVSxHQUFHLFdBQVcsQ0FBQztLQUM5Qzs7O1lBekhGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsZUFBZTtnQkFDekIsaXBOQUEyQzthQUU1Qzs7Ozs7cUJBd0JFLEtBQUssU0FBQyxRQUFRO21CQVVkLEtBQUssU0FBQyxNQUFNO3NCQVNaLEtBQUssU0FBQyxTQUFTO2tCQU1mLE1BQU07bUJBQ04sTUFBTTtzQkFDTixNQUFNO3VCQUVOLFlBQVksU0FBQyxlQUFlLEVBQUUsQ0FBQyxRQUFRLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSG9zdExpc3RlbmVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNlbGVjdEl0ZW0sIFRyZWVOb2RlIH0gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBQcmltZVRhYmxlQ29uZmlnIH0gZnJvbSAnLi9tb2RlbHMvcHJpbWUtdGFibGUtY29uZmlnJztcbmltcG9ydCB7IFByaW1lVGFibGVDb2x1bW4gfSBmcm9tICcuL21vZGVscy9wcmltZS10YWJsZS1jb2x1bW4nO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdiLXByaW1lLXRhYmxlJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3ByaW1lLXRhYmxlLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVzOiBbXVxufSlcbmV4cG9ydCBjbGFzcyBQcmltZVRhYmxlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgcHVibGljIF9jb25maWcgPSBuZXcgUHJpbWVUYWJsZUNvbmZpZygnc3RhbmRhcmQnKTtcbiAgcHVibGljIGRhdGFMb2FkZWQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgcHVibGljIHNob3dGaWx0ZXJzID0gZmFsc2U7XG4gIHB1YmxpYyBoYXNSZW9yZGVyYWJsZUNvbHVtbiA9IGZhbHNlO1xuICBwdWJsaWMgcm93Q291bnQ6IHtvcHRpb25zOiBTZWxlY3RJdGVtW10sIHNlbGVjdGVkOiBudW1iZXJ9ID0ge1xuICAgIG9wdGlvbnM6IFtcbiAgICAgIHtsYWJlbDogJ0FsbCcsIHZhbHVlOiBudWxsfSxcbiAgICAgIHtsYWJlbDogJzUnLCB2YWx1ZTogNX0sXG4gICAgICB7bGFiZWw6ICcxMCcsIHZhbHVlOiAxMH0sXG4gICAgICB7bGFiZWw6ICcyNScsIHZhbHVlOiAyNX0sXG4gICAgICB7bGFiZWw6ICc1MCcsIHZhbHVlOiA1MH0sXG4gICAgICB7bGFiZWw6ICcxMDAnLCB2YWx1ZTogMTAwfVxuICAgIF0sXG4gICAgc2VsZWN0ZWQ6IG51bGxcbiAgfTtcbiAgcHVibGljIHNlbGVjdGVkQ29sdW1uczogYW55W107XG4gIHB1YmxpYyBzZWxlY3RlZFJvd3M6IGFueVtdO1xuXG4gIHB1YmxpYyBzY3JlZW5IZWlnaHQgPSAnMHB4JztcblxuICBwcml2YXRlIGNvbHVtbnNMb2FkZWQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcblxuICBASW5wdXQoJ2NvbmZpZycpXG4gIHNldCBjb25maWcoaW5wdXQ6IFByaW1lVGFibGVDb25maWcpIHtcbiAgICBpZiAoaW5wdXQpIHtcbiAgICAgIHRoaXMuX2NvbmZpZyA9IGlucHV0O1xuICAgICAgdGhpcy5zZXR1cENvbHVtbnMoKTtcbiAgICAgIHRoaXMuc2V0dXBEYXRhKCk7XG4gICAgICB0aGlzLnJvd0NvdW50LnNlbGVjdGVkID0gdGhpcy5fY29uZmlnLnJvd3NTaG93bjtcbiAgICB9XG4gIH1cblxuICBASW5wdXQoJ2RhdGEnKVxuICBzZXQgZGF0YShkYXRhOiBhbnlbXSB8IFRyZWVOb2RlW10pIHtcbiAgICBpZiAoZGF0YSkge1xuICAgICAgdGhpcy5fY29uZmlnLmRyaWxsZG93biA/IHRoaXMuX2NvbmZpZy5zZXRUcmVlRGF0YShkYXRhKVxuICAgICAgOiB0aGlzLl9jb25maWcuc2V0RGF0YShkYXRhKTtcbiAgICAgIHRoaXMuc2V0dXBEYXRhKCk7XG4gICAgfVxuICB9XG5cbiAgQElucHV0KCdjb2x1bW5zJylcbiAgc2V0IGNvbHVtbnMoY29sdW1uczogUHJpbWVUYWJsZUNvbHVtbjxhbnk+W10pIHtcbiAgICB0aGlzLl9jb25maWcuc2V0Q29sdW1ucyhjb2x1bW5zKTtcbiAgICB0aGlzLnNldHVwQ29sdW1ucygpO1xuICB9XG5cbiAgQE91dHB1dCgpIGFkZCA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KCkgZWRpdCA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KCkgYXJjaGl2ZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzpyZXNpemUnLCBbJyRldmVudCddKVxuICBvblJlc2l6ZShldmVudD8pIHtcbiAgICB0aGlzLnNjcmVlbkhlaWdodCA9ICh3aW5kb3cuaW5uZXJIZWlnaHQgLSAzNTApICsgJ3B4JztcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMub25SZXNpemUoKTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICh0aGlzLmhhc1Jlb3JkZXJhYmxlQ29sdW1uKSB7XG4gICAgICAvLyBUb0RvOiBGaXggZm9yIGRyaWxsZG93biB0YWJsZXNcbiAgICAgIHRoaXMuZGF0YUxvYWRlZC5zdWJzY3JpYmUoZGF0YUxvYWRlZCA9PiB7XG4gICAgICAgIGlmIChkYXRhTG9hZGVkKSB7XG4gICAgICAgICAgY29uc3QgcmVvcmRlcmFibGVDb2x1bW4gPSB0aGlzLl9jb25maWcuY29sdW1ucy5maW5kKGNvbCA9PiBjb2wucmVvcmRlcmFibGUgPT09IHRydWUpO1xuICAgICAgICAgIHRoaXMuX2NvbmZpZy5zb3J0YWJsZSA9IGZhbHNlO1xuICAgICAgICAgICh0aGlzLl9jb25maWcuZGF0YSBhcyBhbnlbXSkuc29ydCgoaXRlbTEsIGl0ZW0yKSA9PiBpdGVtMVtyZW9yZGVyYWJsZUNvbHVtbi5uYW1lXSAtIGl0ZW0yW3Jlb3JkZXJhYmxlQ29sdW1uLm5hbWVdKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZXR1cERhdGEoKSB7XG4gICAgdGhpcy5kYXRhTG9hZGVkLm5leHQodHJ1ZSk7XG4gIH1cblxuICBwcml2YXRlIHNldHVwQ29sdW1ucygpIHtcbiAgICB0aGlzLnNlbGVjdGVkQ29sdW1ucyA9IHRoaXMuX2NvbmZpZy5jb2x1bW5zLmZpbHRlcihjb2wgPT4gY29sLnZpc2libGUgIT09IGZhbHNlKTtcbiAgICB0aGlzLmhhc1Jlb3JkZXJhYmxlQ29sdW1uID0gdGhpcy5fY29uZmlnLmNvbHVtbnMuZmluZEluZGV4KGNvbCA9PiBjb2wucmVvcmRlcmFibGUgPT09IHRydWUpID49IDA7XG4gICAgdGhpcy5fY29uZmlnLmNvbHVtbnMuZm9yRWFjaChjb2wgPT4gY29sLmhhc1NlbGVjdCA9IGNvbC52YWx1ZXMgJiYgY29sLnZhbHVlcy5sZW5ndGggPiAxKTtcbiAgICB0aGlzLmNvbHVtbnNMb2FkZWQubmV4dCh0cnVlKTtcbiAgfVxuXG4gIHJvd1Jlb3JkZXJlZCA9IChldmVudDoge2RyYWdJbmRleDogbnVtYmVyLCBkcm9wSW5kZXg6IG51bWJlcn0pID0+IHtcbiAgICBpZiAoZXZlbnQuZHJvcEluZGV4ID49IGV2ZW50LmRyYWdJbmRleCkge1xuICAgICAgLy8gQnVnIGluIFByaW1lTmcsIHdoZW4gZHJhZ2dpbmcgdXAvXCJvbiB0b3BcIiBvZiBhbm90aGVyIHJvdyBpdCBnZXRzIHRoZSB3cm9uZyBpbmRleFxuICAgICAgZXZlbnQuZHJvcEluZGV4LS07XG4gICAgfVxuICAgIGNvbnN0IHJlb3JkZXJhYmxlQ29sdW1uID0gdGhpcy5fY29uZmlnLmNvbHVtbnMuZmluZChjb2wgPT4gY29sLnJlb3JkZXJhYmxlID09PSB0cnVlKTtcbiAgICB0aGlzLl9jb25maWcuZGF0YVtldmVudC5kcm9wSW5kZXhdW3Jlb3JkZXJhYmxlQ29sdW1uLm5hbWVdID0gZXZlbnQuZHJvcEluZGV4ICsgMTtcbiAgICBpZiAoZXZlbnQuZHJvcEluZGV4ID4gZXZlbnQuZHJhZ0luZGV4KSB7XG4gICAgICBmb3IgKGxldCBpID0gZXZlbnQuZHJhZ0luZGV4OyBpIDwgZXZlbnQuZHJvcEluZGV4OyBpKyspIHtcbiAgICAgICAgdGhpcy5fY29uZmlnLmRhdGFbaV1bcmVvcmRlcmFibGVDb2x1bW4ubmFtZV0gPSBpICsgMTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZm9yIChsZXQgaSA9IGV2ZW50LmRyb3BJbmRleDsgaSA8PSBldmVudC5kcmFnSW5kZXg7IGkrKykge1xuICAgICAgICB0aGlzLl9jb25maWcuZGF0YVtpXVtyZW9yZGVyYWJsZUNvbHVtbi5uYW1lXSA9IGkgKyAxO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHRvZ2dsZUZpbHRlcnMgPSAoKSA9PiB0aGlzLnNob3dGaWx0ZXJzID0gIXRoaXMuc2hvd0ZpbHRlcnM7XG5cbiAgZ2V0Q2VsbFZhbHVlKHJvdzogYW55LCBjb2w6IFByaW1lVGFibGVDb2x1bW48YW55Pikge1xuICAgIGlmIChjb2wucmVuZGVyKSB7XG4gICAgICByZXR1cm4gY29sLnJlbmRlcihyb3cpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5yZXNvbHZlS2V5KGNvbC5uYW1lLCByb3cpO1xuICAgIH1cbiAgfVxuXG4gIGdldExpbmtWYWx1ZShyb3c6IGFueSwgY29sOiBQcmltZVRhYmxlQ29sdW1uPGFueT4pIHtcbiAgICBjb25zdCBkeW5hbWljUGF0aCA9IGNvbC53aXRoTGluay5keW5hbWljID8gJy8nICsgdGhpcy5yZXNvbHZlS2V5KGNvbC53aXRoTGluay5keW5hbWljLCByb3cpIDogJyc7XG4gICAgcmV0dXJuIGNvbC53aXRoTGluay5zdGF0aWNQYXRoICsgZHluYW1pY1BhdGg7XG4gIH1cblxuICBwcml2YXRlIHJlc29sdmVLZXkgPSAoa2V5OiBzdHJpbmcsIG9iajogYW55KTogc3RyaW5nID0+IHtcbiAgICByZXR1cm4ga2V5LnNwbGl0KCcuJykucmVkdWNlKChwcmV2OiBhbnksIGN1cnI6IGFueSkgPT4gcHJldiA/IHByZXZbY3Vycl0gOiBudWxsICwgb2JqKTtcbiAgfVxufVxuIl19