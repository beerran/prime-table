import { Injectable, NgModule, Component, EventEmitter, HostListener, Input, Output, defineInjectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { TreeTableModule } from 'primeng/treetable';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class PrimeTableService {
    constructor() { }
}
PrimeTableService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
PrimeTableService.ctorParameters = () => [];
/** @nocollapse */ PrimeTableService.ngInjectableDef = defineInjectable({ factory: function PrimeTableService_Factory() { return new PrimeTableService(); }, token: PrimeTableService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class PrimeTableConfig {
    /**
     * @param {?} preset
     */
    constructor(preset) {
        this.drilldown = false;
        this.rowCount = true;
        this.filters = true;
        this.export = true;
        this.sortable = true;
        this.scrollable = false;
        this.addButton = false;
        this.editButton = false;
        this.archiveButton = false;
        this.responsive = true;
        this.autoLayout = true;
        this.rowsShown = null;
        this.size = 'md';
        this.columnSettings = {
            resizable: false,
            selectable: false
        };
        this.tooltip = null;
        this.drilldownProperty = null;
        this.menu = {
            enabled: false,
            node: null,
            items: []
        };
        switch (preset) {
            case 'easy':
                this.addButton = true;
                this.editButton = true;
                this.archiveButton = true;
                this.export = false;
                this.size = 'sm';
                this.scrollable = false;
                break;
            case 'drilldown':
                this.drilldown = true;
                this.scrollable = false;
                break;
            case 'format':
                this.rowCount = false;
                this.export = false;
                this.columnSettings.selectable = false;
                this.autoLayout = false;
                break;
            case 'standard':
            default:
                this.editButton = true;
                this.addButton = true;
                this.scrollable = true;
                this.rowsShown = 10;
                break;
        }
    }
    /**
     * @param {?} propertyName
     * @return {?}
     */
    setDrilldownProperty(propertyName) {
        this.drilldownProperty = propertyName;
    }
    /**
     * @return {?}
     */
    clear() {
        this.data = [];
        this.menu.node = null;
    }
    /**
     * @param {?} cols
     * @return {?}
     */
    setColumns(cols) {
        cols.forEach(col => col["field"] = col.name);
        this.columns = [...cols];
    }
    /**
     * @param {?} data
     * @return {?}
     */
    setData(data) {
        this.data = [...data];
    }
    /**
     * @param {?} data
     * @return {?}
     */
    setTreeData(data) {
        /** @type {?} */
        const treeNodeData = this.getTreeNodes(data, this.drilldownProperty);
        this.data = [...treeNodeData];
    }
    /**
     * @param {?} properties
     * @return {?}
     */
    disable(properties) {
        properties.forEach(p => this[p] = false);
    }
    /**
     * @param {?} properties
     * @return {?}
     */
    enable(properties) {
        properties.forEach(p => this[p] = true);
    }
    /**
     * @param {?} data
     * @param {?} key
     * @return {?}
     */
    getTreeNodes(data, key) {
        /** @type {?} */
        let transformed = [];
        data.map(item => {
            /** @type {?} */
            const treeNode = { data: item };
            if (item.hasOwnProperty(key) && item[key] && item[key].length > 0) {
                treeNode.children = this.getTreeNodes(item[key], key);
            }
            transformed = [...transformed, treeNode];
        });
        return transformed;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class PrimeTableComponent {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class PrimeTableModule {
}
PrimeTableModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    BrowserModule,
                    BrowserAnimationsModule,
                    FormsModule,
                    ReactiveFormsModule,
                    TableModule,
                    TreeTableModule,
                    MultiSelectModule,
                    DropdownModule,
                    TooltipModule,
                    ContextMenuModule,
                ],
                declarations: [PrimeTableComponent],
                exports: [PrimeTableComponent]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @template T
 */
class PrimeTableColumn {
    /**
     * @param {?} displayName
     * @param {?} name
     * @param {?=} editable
     * @param {?=} reorderable
     * @param {?=} visible
     * @param {?=} render
     * @param {?=} extraClass
     * @param {?=} values
     */
    constructor(displayName, name, editable = false, reorderable = false, visible = true, render, extraClass, values) {
        this.displayName = displayName;
        this.name = name;
        this.editable = editable;
        this.reorderable = reorderable;
        this.visible = visible;
        this.render = render;
        this.extraClass = extraClass;
        this.values = values;
        this.hasSelect = false;
        this.withLink = null;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class PrimeTableColumnLink {
    /**
     * @param {?} staticPath
     * @param {?=} dynamic
     */
    constructor(staticPath, dynamic) {
        this.staticPath = staticPath;
        this.dynamic = dynamic;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class PrimeTableContextMenu {
    /**
     * @param {?} enabled
     * @param {?} node
     * @param {?} items
     */
    constructor(enabled, node, items) {
        this.enabled = enabled;
        this.node = node;
        this.items = items;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { PrimeTableService, PrimeTableComponent, PrimeTableModule, PrimeTableColumn, PrimeTableColumnLink, PrimeTableConfig, PrimeTableContextMenu };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpbWUtdGFibGUuanMubWFwIiwic291cmNlcyI6WyJuZzovL3ByaW1lLXRhYmxlL2xpYi9wcmltZS10YWJsZS5zZXJ2aWNlLnRzIiwibmc6Ly9wcmltZS10YWJsZS9saWIvbW9kZWxzL3ByaW1lLXRhYmxlLWNvbmZpZy50cyIsIm5nOi8vcHJpbWUtdGFibGUvbGliL3ByaW1lLXRhYmxlLmNvbXBvbmVudC50cyIsIm5nOi8vcHJpbWUtdGFibGUvbGliL3ByaW1lLXRhYmxlLm1vZHVsZS50cyIsIm5nOi8vcHJpbWUtdGFibGUvbGliL21vZGVscy9wcmltZS10YWJsZS1jb2x1bW4udHMiLCJuZzovL3ByaW1lLXRhYmxlL2xpYi9tb2RlbHMvcHJpbWUtdGFibGUtY29sdW1uLWxpbmsudHMiLCJuZzovL3ByaW1lLXRhYmxlL2xpYi9tb2RlbHMvcHJpbWUtdGFibGUtY29udGV4dC1tZW51LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgUHJpbWVUYWJsZVNlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG59XG4iLCJpbXBvcnQgeyBUcmVlTm9kZSB9IGZyb20gJ3ByaW1lbmcvYXBpJztcblxuaW1wb3J0IHsgUHJpbWVUYWJsZUNvbHVtbiB9IGZyb20gJy4vcHJpbWUtdGFibGUtY29sdW1uJztcbmltcG9ydCB7IFByaW1lVGFibGVDb250ZXh0TWVudSB9IGZyb20gJy4vcHJpbWUtdGFibGUtY29udGV4dC1tZW51JztcblxuZXhwb3J0IGNsYXNzIFByaW1lVGFibGVDb25maWcge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcmVzZXQ6ICdlYXN5JyB8ICdzdGFuZGFyZCcgfCAnZHJpbGxkb3duJyB8ICdmb3JtYXQnXG4gICAgKSB7XG4gICAgICAgIHN3aXRjaCAocHJlc2V0KSB7XG4gICAgICAgICAgICBjYXNlICdlYXN5JzpcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEJ1dHRvbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5lZGl0QnV0dG9uID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmFyY2hpdmVCdXR0b24gPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuZXhwb3J0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5zaXplID0gJ3NtJztcbiAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbGFibGUgPSBmYWxzZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnZHJpbGxkb3duJzpcbiAgICAgICAgICAgICAgICB0aGlzLmRyaWxsZG93biA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxhYmxlID0gZmFsc2U7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2Zvcm1hdCc6XG4gICAgICAgICAgICAgICAgdGhpcy5yb3dDb3VudCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuZXhwb3J0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5jb2x1bW5TZXR0aW5ncy5zZWxlY3RhYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5hdXRvTGF5b3V0ID0gZmFsc2U7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3N0YW5kYXJkJzpcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhpcy5lZGl0QnV0dG9uID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEJ1dHRvbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnJvd3NTaG93biA9IDEwO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcHVibGljIGRhdGE6IGFueVtdIHwgVHJlZU5vZGVbXTtcbiAgICBwdWJsaWMgY29sdW1uczogUHJpbWVUYWJsZUNvbHVtbjxhbnk+W107XG4gICAgcHVibGljIGRyaWxsZG93biA9IGZhbHNlO1xuXG4gICAgcHVibGljIHJvd0NvdW50ID0gdHJ1ZTtcbiAgICBwdWJsaWMgZmlsdGVycyA9IHRydWU7XG4gICAgcHVibGljIGV4cG9ydCA9IHRydWU7XG4gICAgcHVibGljIHNvcnRhYmxlID0gdHJ1ZTtcbiAgICBwdWJsaWMgc2Nyb2xsYWJsZSA9IGZhbHNlO1xuICAgIHB1YmxpYyBhZGRCdXR0b24gPSBmYWxzZTtcbiAgICBwdWJsaWMgZWRpdEJ1dHRvbiA9IGZhbHNlO1xuICAgIHB1YmxpYyBhcmNoaXZlQnV0dG9uID0gZmFsc2U7XG4gICAgcHVibGljIHJlc3BvbnNpdmUgPSB0cnVlO1xuICAgIHB1YmxpYyBhdXRvTGF5b3V0ID0gdHJ1ZTtcbiAgICBwdWJsaWMgcm93c1Nob3duOiBudW1iZXIgPSBudWxsO1xuICAgIHB1YmxpYyBzaXplOiAnc20nIHwgJ21kJyB8ICdsZycgPSAnbWQnO1xuICAgIHB1YmxpYyBjb2x1bW5TZXR0aW5ncyA9IHtcbiAgICAgICAgcmVzaXphYmxlOiBmYWxzZSxcbiAgICAgICAgc2VsZWN0YWJsZTogZmFsc2VcbiAgICB9O1xuICAgIHB1YmxpYyB0b29sdGlwOiBzdHJpbmcgPSBudWxsO1xuICAgIHB1YmxpYyBkcmlsbGRvd25Qcm9wZXJ0eTogc3RyaW5nID0gbnVsbDtcbiAgICBwdWJsaWMgbWVudTogUHJpbWVUYWJsZUNvbnRleHRNZW51ID0ge1xuICAgICAgICBlbmFibGVkOiBmYWxzZSxcbiAgICAgICAgbm9kZTogbnVsbCxcbiAgICAgICAgaXRlbXM6IFtdXG4gICAgfTtcblxuICAgIHB1YmxpYyBzZXREcmlsbGRvd25Qcm9wZXJ0eShwcm9wZXJ0eU5hbWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLmRyaWxsZG93blByb3BlcnR5ID0gcHJvcGVydHlOYW1lO1xuICAgIH1cblxuICAgIHB1YmxpYyBjbGVhcigpIHtcbiAgICAgICAgdGhpcy5kYXRhID0gW107XG4gICAgICAgIHRoaXMubWVudS5ub2RlID0gbnVsbDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0Q29sdW1ucyhjb2xzOiBQcmltZVRhYmxlQ29sdW1uPGFueT5bXSkge1xuICAgICAgICBjb2xzLmZvckVhY2goY29sID0+IGNvbC5maWVsZCA9IGNvbC5uYW1lKTtcbiAgICAgICAgdGhpcy5jb2x1bW5zID0gWy4uLmNvbHNdO1xuICAgIH1cbiAgICBwdWJsaWMgc2V0RGF0YShkYXRhOiBhbnlbXSkge1xuICAgICAgICB0aGlzLmRhdGEgPSBbLi4uZGF0YV07XG4gICAgfVxuICAgIHB1YmxpYyBzZXRUcmVlRGF0YShkYXRhOiBhbnlbXSkge1xuICAgICAgICBjb25zdCB0cmVlTm9kZURhdGEgPSB0aGlzLmdldFRyZWVOb2RlcyhkYXRhLCB0aGlzLmRyaWxsZG93blByb3BlcnR5KTtcbiAgICAgICAgdGhpcy5kYXRhID0gWy4uLnRyZWVOb2RlRGF0YV07XG4gICAgfVxuXG4gICAgcHVibGljIGRpc2FibGUocHJvcGVydGllczogc3RyaW5nW10pIHtcbiAgICAgICAgcHJvcGVydGllcy5mb3JFYWNoKHAgPT4gdGhpc1twXSA9IGZhbHNlKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZW5hYmxlKHByb3BlcnRpZXM6IHN0cmluZ1tdKSB7XG4gICAgICAgIHByb3BlcnRpZXMuZm9yRWFjaChwID0+IHRoaXNbcF0gPSB0cnVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFRyZWVOb2RlcyhkYXRhOiBhbnlbXSwga2V5OiBzdHJpbmcpOiBUcmVlTm9kZVtdIHtcbiAgICAgICAgbGV0IHRyYW5zZm9ybWVkOiBUcmVlTm9kZVtdID0gW107XG5cbiAgICAgICAgZGF0YS5tYXAoaXRlbSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0cmVlTm9kZTogVHJlZU5vZGUgPSB7IGRhdGE6IGl0ZW0gfTtcbiAgICAgICAgICAgIGlmIChpdGVtLmhhc093blByb3BlcnR5KGtleSkgJiYgaXRlbVtrZXldICYmIGl0ZW1ba2V5XS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgdHJlZU5vZGUuY2hpbGRyZW4gPSB0aGlzLmdldFRyZWVOb2RlcyhpdGVtW2tleV0sIGtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0cmFuc2Zvcm1lZCA9IFsuLi50cmFuc2Zvcm1lZCwgdHJlZU5vZGVdO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdHJhbnNmb3JtZWQ7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTZWxlY3RJdGVtLCBUcmVlTm9kZSB9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgUHJpbWVUYWJsZUNvbmZpZyB9IGZyb20gJy4vbW9kZWxzL3ByaW1lLXRhYmxlLWNvbmZpZyc7XG5pbXBvcnQgeyBQcmltZVRhYmxlQ29sdW1uIH0gZnJvbSAnLi9tb2RlbHMvcHJpbWUtdGFibGUtY29sdW1uJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYi1wcmltZS10YWJsZScsXG4gIHRlbXBsYXRlVXJsOiAnLi9wcmltZS10YWJsZS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlczogW11cbn0pXG5leHBvcnQgY2xhc3MgUHJpbWVUYWJsZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIHB1YmxpYyBfY29uZmlnID0gbmV3IFByaW1lVGFibGVDb25maWcoJ3N0YW5kYXJkJyk7XG4gIHB1YmxpYyBkYXRhTG9hZGVkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHB1YmxpYyBzaG93RmlsdGVycyA9IGZhbHNlO1xuICBwdWJsaWMgaGFzUmVvcmRlcmFibGVDb2x1bW4gPSBmYWxzZTtcbiAgcHVibGljIHJvd0NvdW50OiB7b3B0aW9uczogU2VsZWN0SXRlbVtdLCBzZWxlY3RlZDogbnVtYmVyfSA9IHtcbiAgICBvcHRpb25zOiBbXG4gICAgICB7bGFiZWw6ICdBbGwnLCB2YWx1ZTogbnVsbH0sXG4gICAgICB7bGFiZWw6ICc1JywgdmFsdWU6IDV9LFxuICAgICAge2xhYmVsOiAnMTAnLCB2YWx1ZTogMTB9LFxuICAgICAge2xhYmVsOiAnMjUnLCB2YWx1ZTogMjV9LFxuICAgICAge2xhYmVsOiAnNTAnLCB2YWx1ZTogNTB9LFxuICAgICAge2xhYmVsOiAnMTAwJywgdmFsdWU6IDEwMH1cbiAgICBdLFxuICAgIHNlbGVjdGVkOiBudWxsXG4gIH07XG4gIHB1YmxpYyBzZWxlY3RlZENvbHVtbnM6IGFueVtdO1xuICBwdWJsaWMgc2VsZWN0ZWRSb3dzOiBhbnlbXTtcblxuICBwdWJsaWMgc2NyZWVuSGVpZ2h0ID0gJzBweCc7XG5cbiAgcHJpdmF0ZSBjb2x1bW5zTG9hZGVkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG5cbiAgQElucHV0KCdjb25maWcnKVxuICBzZXQgY29uZmlnKGlucHV0OiBQcmltZVRhYmxlQ29uZmlnKSB7XG4gICAgaWYgKGlucHV0KSB7XG4gICAgICB0aGlzLl9jb25maWcgPSBpbnB1dDtcbiAgICAgIHRoaXMuc2V0dXBDb2x1bW5zKCk7XG4gICAgICB0aGlzLnNldHVwRGF0YSgpO1xuICAgICAgdGhpcy5yb3dDb3VudC5zZWxlY3RlZCA9IHRoaXMuX2NvbmZpZy5yb3dzU2hvd247XG4gICAgfVxuICB9XG5cbiAgQElucHV0KCdkYXRhJylcbiAgc2V0IGRhdGEoZGF0YTogYW55W10gfCBUcmVlTm9kZVtdKSB7XG4gICAgaWYgKGRhdGEpIHtcbiAgICAgIHRoaXMuX2NvbmZpZy5kcmlsbGRvd24gPyB0aGlzLl9jb25maWcuc2V0VHJlZURhdGEoZGF0YSlcbiAgICAgIDogdGhpcy5fY29uZmlnLnNldERhdGEoZGF0YSk7XG4gICAgICB0aGlzLnNldHVwRGF0YSgpO1xuICAgIH1cbiAgfVxuXG4gIEBJbnB1dCgnY29sdW1ucycpXG4gIHNldCBjb2x1bW5zKGNvbHVtbnM6IFByaW1lVGFibGVDb2x1bW48YW55PltdKSB7XG4gICAgdGhpcy5fY29uZmlnLnNldENvbHVtbnMoY29sdW1ucyk7XG4gICAgdGhpcy5zZXR1cENvbHVtbnMoKTtcbiAgfVxuXG4gIEBPdXRwdXQoKSBhZGQgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgpIGVkaXQgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgpIGFyY2hpdmUgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBASG9zdExpc3RlbmVyKCd3aW5kb3c6cmVzaXplJywgWyckZXZlbnQnXSlcbiAgb25SZXNpemUoZXZlbnQ/KSB7XG4gICAgdGhpcy5zY3JlZW5IZWlnaHQgPSAod2luZG93LmlubmVySGVpZ2h0IC0gMzUwKSArICdweCc7XG4gIH1cblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLm9uUmVzaXplKCk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAodGhpcy5oYXNSZW9yZGVyYWJsZUNvbHVtbikge1xuICAgICAgLy8gVG9EbzogRml4IGZvciBkcmlsbGRvd24gdGFibGVzXG4gICAgICB0aGlzLmRhdGFMb2FkZWQuc3Vic2NyaWJlKGRhdGFMb2FkZWQgPT4ge1xuICAgICAgICBpZiAoZGF0YUxvYWRlZCkge1xuICAgICAgICAgIGNvbnN0IHJlb3JkZXJhYmxlQ29sdW1uID0gdGhpcy5fY29uZmlnLmNvbHVtbnMuZmluZChjb2wgPT4gY29sLnJlb3JkZXJhYmxlID09PSB0cnVlKTtcbiAgICAgICAgICB0aGlzLl9jb25maWcuc29ydGFibGUgPSBmYWxzZTtcbiAgICAgICAgICAodGhpcy5fY29uZmlnLmRhdGEgYXMgYW55W10pLnNvcnQoKGl0ZW0xLCBpdGVtMikgPT4gaXRlbTFbcmVvcmRlcmFibGVDb2x1bW4ubmFtZV0gLSBpdGVtMltyZW9yZGVyYWJsZUNvbHVtbi5uYW1lXSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2V0dXBEYXRhKCkge1xuICAgIHRoaXMuZGF0YUxvYWRlZC5uZXh0KHRydWUpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXR1cENvbHVtbnMoKSB7XG4gICAgdGhpcy5zZWxlY3RlZENvbHVtbnMgPSB0aGlzLl9jb25maWcuY29sdW1ucy5maWx0ZXIoY29sID0+IGNvbC52aXNpYmxlICE9PSBmYWxzZSk7XG4gICAgdGhpcy5oYXNSZW9yZGVyYWJsZUNvbHVtbiA9IHRoaXMuX2NvbmZpZy5jb2x1bW5zLmZpbmRJbmRleChjb2wgPT4gY29sLnJlb3JkZXJhYmxlID09PSB0cnVlKSA+PSAwO1xuICAgIHRoaXMuX2NvbmZpZy5jb2x1bW5zLmZvckVhY2goY29sID0+IGNvbC5oYXNTZWxlY3QgPSBjb2wudmFsdWVzICYmIGNvbC52YWx1ZXMubGVuZ3RoID4gMSk7XG4gICAgdGhpcy5jb2x1bW5zTG9hZGVkLm5leHQodHJ1ZSk7XG4gIH1cblxuICByb3dSZW9yZGVyZWQgPSAoZXZlbnQ6IHtkcmFnSW5kZXg6IG51bWJlciwgZHJvcEluZGV4OiBudW1iZXJ9KSA9PiB7XG4gICAgaWYgKGV2ZW50LmRyb3BJbmRleCA+PSBldmVudC5kcmFnSW5kZXgpIHtcbiAgICAgIC8vIEJ1ZyBpbiBQcmltZU5nLCB3aGVuIGRyYWdnaW5nIHVwL1wib24gdG9wXCIgb2YgYW5vdGhlciByb3cgaXQgZ2V0cyB0aGUgd3JvbmcgaW5kZXhcbiAgICAgIGV2ZW50LmRyb3BJbmRleC0tO1xuICAgIH1cbiAgICBjb25zdCByZW9yZGVyYWJsZUNvbHVtbiA9IHRoaXMuX2NvbmZpZy5jb2x1bW5zLmZpbmQoY29sID0+IGNvbC5yZW9yZGVyYWJsZSA9PT0gdHJ1ZSk7XG4gICAgdGhpcy5fY29uZmlnLmRhdGFbZXZlbnQuZHJvcEluZGV4XVtyZW9yZGVyYWJsZUNvbHVtbi5uYW1lXSA9IGV2ZW50LmRyb3BJbmRleCArIDE7XG4gICAgaWYgKGV2ZW50LmRyb3BJbmRleCA+IGV2ZW50LmRyYWdJbmRleCkge1xuICAgICAgZm9yIChsZXQgaSA9IGV2ZW50LmRyYWdJbmRleDsgaSA8IGV2ZW50LmRyb3BJbmRleDsgaSsrKSB7XG4gICAgICAgIHRoaXMuX2NvbmZpZy5kYXRhW2ldW3Jlb3JkZXJhYmxlQ29sdW1uLm5hbWVdID0gaSArIDE7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAobGV0IGkgPSBldmVudC5kcm9wSW5kZXg7IGkgPD0gZXZlbnQuZHJhZ0luZGV4OyBpKyspIHtcbiAgICAgICAgdGhpcy5fY29uZmlnLmRhdGFbaV1bcmVvcmRlcmFibGVDb2x1bW4ubmFtZV0gPSBpICsgMTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB0b2dnbGVGaWx0ZXJzID0gKCkgPT4gdGhpcy5zaG93RmlsdGVycyA9ICF0aGlzLnNob3dGaWx0ZXJzO1xuXG4gIGdldENlbGxWYWx1ZShyb3c6IGFueSwgY29sOiBQcmltZVRhYmxlQ29sdW1uPGFueT4pIHtcbiAgICBpZiAoY29sLnJlbmRlcikge1xuICAgICAgcmV0dXJuIGNvbC5yZW5kZXIocm93KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMucmVzb2x2ZUtleShjb2wubmFtZSwgcm93KTtcbiAgICB9XG4gIH1cblxuICBnZXRMaW5rVmFsdWUocm93OiBhbnksIGNvbDogUHJpbWVUYWJsZUNvbHVtbjxhbnk+KSB7XG4gICAgY29uc3QgZHluYW1pY1BhdGggPSBjb2wud2l0aExpbmsuZHluYW1pYyA/ICcvJyArIHRoaXMucmVzb2x2ZUtleShjb2wud2l0aExpbmsuZHluYW1pYywgcm93KSA6ICcnO1xuICAgIHJldHVybiBjb2wud2l0aExpbmsuc3RhdGljUGF0aCArIGR5bmFtaWNQYXRoO1xuICB9XG5cbiAgcHJpdmF0ZSByZXNvbHZlS2V5ID0gKGtleTogc3RyaW5nLCBvYmo6IGFueSk6IHN0cmluZyA9PiB7XG4gICAgcmV0dXJuIGtleS5zcGxpdCgnLicpLnJlZHVjZSgocHJldjogYW55LCBjdXJyOiBhbnkpID0+IHByZXYgPyBwcmV2W2N1cnJdIDogbnVsbCAsIG9iaik7XG4gIH1cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEJyb3dzZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7IEJyb3dzZXJBbmltYXRpb25zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zJztcbmltcG9ydCB7IENvbnRleHRNZW51TW9kdWxlIH0gZnJvbSAncHJpbWVuZy9jb250ZXh0bWVudSc7XG5pbXBvcnQgeyBEcm9wZG93bk1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvZHJvcGRvd24nO1xuaW1wb3J0IHsgTXVsdGlTZWxlY3RNb2R1bGUgfSBmcm9tICdwcmltZW5nL211bHRpc2VsZWN0JztcbmltcG9ydCB7IFRhYmxlTW9kdWxlIH0gZnJvbSAncHJpbWVuZy90YWJsZSc7XG5pbXBvcnQgeyBUb29sdGlwTW9kdWxlIH0gZnJvbSAncHJpbWVuZy90b29sdGlwJztcbmltcG9ydCB7IFRyZWVUYWJsZU1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvdHJlZXRhYmxlJztcblxuaW1wb3J0IHsgUHJpbWVUYWJsZUNvbXBvbmVudCB9IGZyb20gJy4vcHJpbWUtdGFibGUuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIEJyb3dzZXJNb2R1bGUsXG4gICAgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBUYWJsZU1vZHVsZSxcbiAgICBUcmVlVGFibGVNb2R1bGUsXG4gICAgTXVsdGlTZWxlY3RNb2R1bGUsXG4gICAgRHJvcGRvd25Nb2R1bGUsXG4gICAgVG9vbHRpcE1vZHVsZSxcbiAgICBDb250ZXh0TWVudU1vZHVsZSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbUHJpbWVUYWJsZUNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtQcmltZVRhYmxlQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBQcmltZVRhYmxlTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgUHJpbWVUYWJsZUNvbHVtbkxpbmsgfSBmcm9tICcuL3ByaW1lLXRhYmxlLWNvbHVtbi1saW5rJztcblxuZXhwb3J0IGNsYXNzIFByaW1lVGFibGVDb2x1bW48VD4ge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgZGlzcGxheU5hbWU6IHN0cmluZyxcbiAgICAgICAgcHVibGljIG5hbWU6IHN0cmluZyxcbiAgICAgICAgcHVibGljIGVkaXRhYmxlID0gZmFsc2UsXG4gICAgICAgIHB1YmxpYyByZW9yZGVyYWJsZSA9IGZhbHNlLFxuICAgICAgICBwdWJsaWMgdmlzaWJsZSA9IHRydWUsXG4gICAgICAgIHB1YmxpYyByZW5kZXI/OiAocm93OiBUKSA9PiBhbnksXG4gICAgICAgIHB1YmxpYyBleHRyYUNsYXNzPzogKHJvdzogVCkgPT4gc3RyaW5nLFxuICAgICAgICBwdWJsaWMgdmFsdWVzPzogYW55W11cbiAgICApIHsgfVxuICAgIGhhc1NlbGVjdCA/ID0gZmFsc2U7XG4gICAgW2tleTogc3RyaW5nXTogYW55O1xuICAgIHdpdGhMaW5rOiBQcmltZVRhYmxlQ29sdW1uTGluayA9IG51bGw7XG59XG4iLCJleHBvcnQgY2xhc3MgUHJpbWVUYWJsZUNvbHVtbkxpbmsge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgc3RhdGljUGF0aDogc3RyaW5nLFxuICAgICAgICBwdWJsaWMgZHluYW1pYz86IHN0cmluZ1xuICAgICkgeyB9XG59XG4iLCJpbXBvcnQgeyBNZW51SXRlbSwgVHJlZU5vZGUgfSBmcm9tICdwcmltZW5nL2FwaSc7XG5cbmV4cG9ydCBjbGFzcyBQcmltZVRhYmxlQ29udGV4dE1lbnUge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgZW5hYmxlZDogYm9vbGVhbixcbiAgICAgICAgcHVibGljIG5vZGU6IFRyZWVOb2RlIHwgYW55LFxuICAgICAgICBwdWJsaWMgaXRlbXM6IE1lbnVJdGVtW11cbiAgICApIHsgfVxufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtJQU9FLGlCQUFpQjs7O1lBTGxCLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7Ozs7Ozs7OztBQ0NEOzs7O0lBQ0ksWUFDSSxNQUFvRDt5QkFnQ3JDLEtBQUs7d0JBRU4sSUFBSTt1QkFDTCxJQUFJO3NCQUNMLElBQUk7d0JBQ0YsSUFBSTswQkFDRixLQUFLO3lCQUNOLEtBQUs7MEJBQ0osS0FBSzs2QkFDRixLQUFLOzBCQUNSLElBQUk7MEJBQ0osSUFBSTt5QkFDRyxJQUFJO29CQUNHLElBQUk7OEJBQ2Q7WUFDcEIsU0FBUyxFQUFFLEtBQUs7WUFDaEIsVUFBVSxFQUFFLEtBQUs7U0FDcEI7dUJBQ3dCLElBQUk7aUNBQ00sSUFBSTtvQkFDRjtZQUNqQyxPQUFPLEVBQUUsS0FBSztZQUNkLElBQUksRUFBRSxJQUFJO1lBQ1YsS0FBSyxFQUFFLEVBQUU7U0FDWjtRQXRERyxRQUFRLE1BQU07WUFDVixLQUFLLE1BQU07Z0JBQ1AsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7Z0JBQ3RCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO2dCQUN2QixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztnQkFDMUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7Z0JBQ3BCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO2dCQUNqQixJQUFJLENBQUMs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