import { Injectable, NgModule, Component, EventEmitter, HostListener, Input, Output, defineInjectable } from '@angular/core';
import { __spread } from 'tslib';
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
var PrimeTableService = /** @class */ (function () {
    function PrimeTableService() {
    }
    PrimeTableService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    PrimeTableService.ctorParameters = function () { return []; };
    /** @nocollapse */ PrimeTableService.ngInjectableDef = defineInjectable({ factory: function PrimeTableService_Factory() { return new PrimeTableService(); }, token: PrimeTableService, providedIn: "root" });
    return PrimeTableService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var PrimeTableConfig = /** @class */ (function () {
    function PrimeTableConfig(preset) {
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
    PrimeTableConfig.prototype.setDrilldownProperty = /**
     * @param {?} propertyName
     * @return {?}
     */
    function (propertyName) {
        this.drilldownProperty = propertyName;
    };
    /**
     * @return {?}
     */
    PrimeTableConfig.prototype.clear = /**
     * @return {?}
     */
    function () {
        this.data = [];
        this.menu.node = null;
    };
    /**
     * @param {?} cols
     * @return {?}
     */
    PrimeTableConfig.prototype.setColumns = /**
     * @param {?} cols
     * @return {?}
     */
    function (cols) {
        cols.forEach(function (col) { return col["field"] = col.name; });
        this.columns = __spread(cols);
    };
    /**
     * @param {?} data
     * @return {?}
     */
    PrimeTableConfig.prototype.setData = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        this.data = __spread(data);
    };
    /**
     * @param {?} data
     * @return {?}
     */
    PrimeTableConfig.prototype.setTreeData = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        /** @type {?} */
        var treeNodeData = this.getTreeNodes(data, this.drilldownProperty);
        this.data = __spread(treeNodeData);
    };
    /**
     * @param {?} properties
     * @return {?}
     */
    PrimeTableConfig.prototype.disable = /**
     * @param {?} properties
     * @return {?}
     */
    function (properties) {
        var _this = this;
        properties.forEach(function (p) { return _this[p] = false; });
    };
    /**
     * @param {?} properties
     * @return {?}
     */
    PrimeTableConfig.prototype.enable = /**
     * @param {?} properties
     * @return {?}
     */
    function (properties) {
        var _this = this;
        properties.forEach(function (p) { return _this[p] = true; });
    };
    /**
     * @param {?} data
     * @param {?} key
     * @return {?}
     */
    PrimeTableConfig.prototype.getTreeNodes = /**
     * @param {?} data
     * @param {?} key
     * @return {?}
     */
    function (data, key) {
        var _this = this;
        /** @type {?} */
        var transformed = [];
        data.map(function (item) {
            /** @type {?} */
            var treeNode = { data: item };
            if (item.hasOwnProperty(key) && item[key] && item[key].length > 0) {
                treeNode.children = _this.getTreeNodes(item[key], key);
            }
            transformed = __spread(transformed, [treeNode]);
        });
        return transformed;
    };
    return PrimeTableConfig;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var PrimeTableComponent = /** @class */ (function () {
    function PrimeTableComponent() {
        var _this = this;
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
        this.rowReordered = function (event) {
            if (event.dropIndex >= event.dragIndex) {
                // Bug in PrimeNg, when dragging up/"on top" of another row it gets the wrong index
                event.dropIndex--;
            }
            /** @type {?} */
            var reorderableColumn = _this._config.columns.find(function (col) { return col.reorderable === true; });
            _this._config.data[event.dropIndex][reorderableColumn.name] = event.dropIndex + 1;
            if (event.dropIndex > event.dragIndex) {
                for (var i = event.dragIndex; i < event.dropIndex; i++) {
                    _this._config.data[i][reorderableColumn.name] = i + 1;
                }
            }
            else {
                for (var i = event.dropIndex; i <= event.dragIndex; i++) {
                    _this._config.data[i][reorderableColumn.name] = i + 1;
                }
            }
        };
        this.toggleFilters = function () { return _this.showFilters = !_this.showFilters; };
        this.resolveKey = function (key, obj) {
            return key.split('.').reduce(function (prev, curr) { return prev ? prev[curr] : null; }, obj);
        };
        this.onResize();
    }
    Object.defineProperty(PrimeTableComponent.prototype, "config", {
        set: /**
         * @param {?} input
         * @return {?}
         */
        function (input) {
            if (input) {
                this._config = input;
                this.setupColumns();
                this.setupData();
                this.rowCount.selected = this._config.rowsShown;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrimeTableComponent.prototype, "data", {
        set: /**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            if (data) {
                this._config.drilldown ? this._config.setTreeData(data)
                    : this._config.setData(data);
                this.setupData();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrimeTableComponent.prototype, "columns", {
        set: /**
         * @param {?} columns
         * @return {?}
         */
        function (columns) {
            this._config.setColumns(columns);
            this.setupColumns();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?=} event
     * @return {?}
     */
    PrimeTableComponent.prototype.onResize = /**
     * @param {?=} event
     * @return {?}
     */
    function (event) {
        this.screenHeight = (window.innerHeight - 350) + 'px';
    };
    /**
     * @return {?}
     */
    PrimeTableComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.hasReorderableColumn) {
            // ToDo: Fix for drilldown tables
            this.dataLoaded.subscribe(function (dataLoaded) {
                if (dataLoaded) {
                    /** @type {?} */
                    var reorderableColumn_1 = _this._config.columns.find(function (col) { return col.reorderable === true; });
                    _this._config.sortable = false;
                    (/** @type {?} */ (_this._config.data)).sort(function (item1, item2) { return item1[reorderableColumn_1.name] - item2[reorderableColumn_1.name]; });
                }
            });
        }
    };
    /**
     * @return {?}
     */
    PrimeTableComponent.prototype.setupData = /**
     * @return {?}
     */
    function () {
        this.dataLoaded.next(true);
    };
    /**
     * @return {?}
     */
    PrimeTableComponent.prototype.setupColumns = /**
     * @return {?}
     */
    function () {
        this.selectedColumns = this._config.columns.filter(function (col) { return col.visible !== false; });
        this.hasReorderableColumn = this._config.columns.findIndex(function (col) { return col.reorderable === true; }) >= 0;
        this._config.columns.forEach(function (col) { return col.hasSelect = col.values && col.values.length > 1; });
        this.columnsLoaded.next(true);
    };
    /**
     * @param {?} row
     * @param {?} col
     * @return {?}
     */
    PrimeTableComponent.prototype.getCellValue = /**
     * @param {?} row
     * @param {?} col
     * @return {?}
     */
    function (row, col) {
        if (col.render) {
            return col.render(row);
        }
        else {
            return this.resolveKey(col.name, row);
        }
    };
    /**
     * @param {?} row
     * @param {?} col
     * @return {?}
     */
    PrimeTableComponent.prototype.getLinkValue = /**
     * @param {?} row
     * @param {?} col
     * @return {?}
     */
    function (row, col) {
        /** @type {?} */
        var dynamicPath = col.withLink.dynamic ? '/' + this.resolveKey(col.withLink.dynamic, row) : '';
        return col.withLink.staticPath + dynamicPath;
    };
    PrimeTableComponent.decorators = [
        { type: Component, args: [{
                    selector: 'b-prime-table',
                    template: "<p-contextMenu #cm appendTo=\"body\" [model]=\"_config.menu.items\"></p-contextMenu>\n\n\n<p-treeTable *ngIf=\"_config.drilldown\" [value]=\"_config.data\" [(contextMenuSelection)]=\"_config.menu.node\" [contextMenu]=\"cm\" [columns]=\"selectedColumns\" class=\"table\" [class.table-sm]=\"_config.size === 'sm'\">\n    <ng-template pTemplate=\"header\" let-columns>\n        <tr>\n            <th *ngFor=\"let col of columns\">{{col.displayName || col.name}}</th>\n        </tr>\n    </ng-template>\n    <ng-template pTemplate=\"body\" let-rowNode let-rowData=\"rowData\" let-columns=\"columns\">\n        <tr [ttContextMenuRow]=\"rowNode\" tooltipPosition=\"top\" [pTooltip]=\"_config.tooltip ? rowData[_config.tooltip] : null\">\n            <td *ngFor=\"let col of columns; let i = index\" [ngClass]=\"col.extraClass ? col.extraClass(rowData) : ''\">\n                <p-treeTableToggler [rowNode]=\"rowNode\" *ngIf=\"i === 0\"></p-treeTableToggler>\n                <span>{{rowData[col.name]}}</span>\n            </td>\n        </tr>\n    </ng-template>\n</p-treeTable>\n<p-table [responsive]=\"_config.responsive\" [autoLayout]=\"_config.autoLayout\" (onRowReorder)=\"rowReordered($event)\" *ngIf=\"!_config.drilldown\" #dt [(contextMenuSelection)]=\"_config.menu.node\" [contextMenu]=\"cm\" [resizableColumns]=\"_config.columnSettings.resizable\"\n    selectionMode=\"multiple\" [(selection)]=\"selectedRows\" [scrollHeight]=\"screenHeight\" [paginator]=\"rowCount.selected ? _config.data.length > rowCount.selected : false\" [rows]=\"rowCount.selected\" class=\"table\" [class.table-sm]=\"_config.size === 'sm'\" [value]=\"_config.data\"\n    [columns]=\"selectedColumns\">\n    <ng-template pTemplate=\"caption\">\n        <div class=\"row\">\n            <div class=\"col-6 col-md-2\" *ngIf=\"_config.rowCount\">\n                <p-dropdown class=\"pull-left\" [options]=\"rowCount.options\" [(ngModel)]=\"rowCount.selected\"></p-dropdown>\n            </div>\n            <div class=\"col-6 col-md-3\" *ngIf=\"_config.columnSettings.selectable\" [class.col-md-5]=\"!_config.rowCount\">\n                <p-multiSelect [options]=\"_config.columns\" [(ngModel)]=\"selectedColumns\" optionLabel=\"displayName\" selectedItemsLabel=\"{0} columns selected\" [style]=\"{minWidth: '200px'}\" defaultLabel=\"Choose Columns\"></p-multiSelect>\n            </div>\n            <div class=\"col-12 col-md-7\" [class.col-md-10]=\"!_config.columnSettings.selectable\" [class.col-md-12]=\"!_config.rowCount && !_config.columnSettings.selectable\">\n                <button *ngIf=\"_config.filters\" class=\"btn btn-sm btn-dark d-inline\" type=\"button\" (click)=\"toggleFilters()\">Filters</button>\n                <button *ngIf=\"_config.export\" class=\"btn btn-sm btn-dark mx-2 d-inline\" type=\"button\" pButton iconPos=\"left\" label=\"All Data\" (click)=\"dt.exportCSV()\">Export</button>\n                <button *ngIf=\"_config.addButton\" class=\"btn btn-sm btn-success ml-2 pull-right\" type=\"button\" (click)=\"add.emit(true)\">Add new</button>\n                <ng-content select=\".table-extra-content\"></ng-content>\n            </div>\n        </div>\n        <div class=\"row\" *ngIf=\"showFilters\">\n            <div class=\"col\">\n                <input type=\"text\" style=\"width:auto\" class=\"form-control form-control-sm d-inline\" pInputText size=\"50\" placeholder=\"Global Filter\" (input)=\"dt.filterGlobal($event.target.value, 'contains')\">\n            </div>\n        </div>\n    </ng-template>\n    <ng-template pTemplate=\"header\" let-columns>\n        <tr *ngIf=\"_config.sortable; else unsortableRow\">\n            <th *ngIf=\"hasReorderableColumn\" style=\"width:3rem\"></th>\n            <th [pSortableColumn]=\"col.name\" *ngFor=\"let col of columns\" pResizableColumn>\n                {{col.displayName || col.name}}\n                <p-sortIcon [field]=\"col.name\"></p-sortIcon>\n            </th>\n            <th *ngIf=\"_config.editButton\">Edit</th>\n            <th *ngIf=\"_config.archiveButton\">Archive</th>\n        </tr>\n        <ng-template #unsortableRow>\n            <tr>\n                <th *ngIf=\"hasReorderableColumn\" style=\"width:3rem\"></th>\n                <th *ngFor=\"let col of columns\" pResizableColumn>\n                    {{col.displayName || col.name}}\n                </th>\n                <th *ngIf=\"_config.editButton\">Edit</th>\n                <th *ngIf=\"_config.archiveButton\">Archive</th>\n            </tr>\n        </ng-template>\n    </ng-template>\n\n    <ng-template pTemplate=\"body\" let-row let-columns=\"columns\" let-index=\"rowIndex\">\n        <tr [pContextMenuRow]=\"row\" [pSelectableRow]=\"row\" [pReorderableRow]=\"index\" (onDrop)=\"rowReordered($event)\">\n            <td *ngIf=\"hasReorderableColumn\">\n                <i class=\"fa fa-bars move\" pReorderableRowHandle></i>\n            </td>\n            <td *ngFor=\"let col of columns\" [class.with-select]=\"col.hasSelect\" pEditableColumn class=\"ui-resizable-column\" [ngClass]=\"col.extraClass ? col.extraClass(row) : ''\">\n                <p-cellEditor *ngIf=\"col.editable; else onlyOutput\">\n                    <ng-template pTemplate=\"input\">\n                        <input type=\"text\" class=\"form-control form-control-sm\" [(ngModel)]=\"row[col.field]\" />\n                    </ng-template>\n                    <ng-template pTemplate=\"output\">\n                        <span>{{getCellValue(row, col)}}</span>\n                    </ng-template>\n                </p-cellEditor>\n                <ng-template #onlyOutput>\n                    <div *ngIf=\"col.hasSelect; else textInput\">\n                        <p-dropdown class=\"w-auto mw-100\" [options]=\"col.values\" placeholder=\"Select\" optionLabel=\"name\" [filter]=\"true\" filterBy=\"value.name\" [(ngModel)]=\"row[col.name]\">\n                        </p-dropdown>\n                    </div>\n                    <ng-template #textInput>\n                        <a *ngIf=\"col.withLink; else spanOnly\" routerLink=\"/{{getLinkValue(row, col)}}\">{{getCellValue(row, col)}}</a>\n                        <ng-template #spanOnly><span>{{getCellValue(row, col)}}</span></ng-template>\n                    </ng-template>\n                </ng-template>\n            </td>\n            <td *ngIf=\"_config.editButton\"><button class=\"btn btn-xs btn-dark\" (click)=\"edit.emit(row)\">Edit</button></td>\n            <td *ngIf=\"_config.archiveButton\"><button class=\"btn btn-xs\" [ngClass]=\"row.archived ? 'btn-dark' : 'btn-danger'\" (click)=\"archive.emit(row)\">{{row.archived ? 'Restore' : 'Archive'}}</button></td>\n        </tr>\n    </ng-template>\n</p-table>\n\n<div *ngIf=\"(dataLoaded | async) === false\">Loading data...</div>"
                }] }
    ];
    /** @nocollapse */
    PrimeTableComponent.ctorParameters = function () { return []; };
    PrimeTableComponent.propDecorators = {
        config: [{ type: Input, args: ['config',] }],
        data: [{ type: Input, args: ['data',] }],
        columns: [{ type: Input, args: ['columns',] }],
        add: [{ type: Output }],
        edit: [{ type: Output }],
        archive: [{ type: Output }],
        onResize: [{ type: HostListener, args: ['window:resize', ['$event'],] }]
    };
    return PrimeTableComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var PrimeTableModule = /** @class */ (function () {
    function PrimeTableModule() {
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
    return PrimeTableModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @template T
 */
var  /**
 * @template T
 */
PrimeTableColumn = /** @class */ (function () {
    function PrimeTableColumn(displayName, name, editable, reorderable, visible, render, extraClass, values) {
        if (editable === void 0) { editable = false; }
        if (reorderable === void 0) { reorderable = false; }
        if (visible === void 0) { visible = true; }
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
    return PrimeTableColumn;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var PrimeTableColumnLink = /** @class */ (function () {
    function PrimeTableColumnLink(staticPath, dynamic) {
        this.staticPath = staticPath;
        this.dynamic = dynamic;
    }
    return PrimeTableColumnLink;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var PrimeTableContextMenu = /** @class */ (function () {
    function PrimeTableContextMenu(enabled, node, items) {
        this.enabled = enabled;
        this.node = node;
        this.items = items;
    }
    return PrimeTableContextMenu;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { PrimeTableService, PrimeTableComponent, PrimeTableModule, PrimeTableColumn, PrimeTableColumnLink, PrimeTableConfig, PrimeTableContextMenu };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpbWUtdGFibGUuanMubWFwIiwic291cmNlcyI6WyJuZzovL3ByaW1lLXRhYmxlL2xpYi9wcmltZS10YWJsZS5zZXJ2aWNlLnRzIiwibmc6Ly9wcmltZS10YWJsZS9saWIvbW9kZWxzL3ByaW1lLXRhYmxlLWNvbmZpZy50cyIsIm5nOi8vcHJpbWUtdGFibGUvbGliL3ByaW1lLXRhYmxlLmNvbXBvbmVudC50cyIsIm5nOi8vcHJpbWUtdGFibGUvbGliL3ByaW1lLXRhYmxlLm1vZHVsZS50cyIsIm5nOi8vcHJpbWUtdGFibGUvbGliL21vZGVscy9wcmltZS10YWJsZS1jb2x1bW4udHMiLCJuZzovL3ByaW1lLXRhYmxlL2xpYi9tb2RlbHMvcHJpbWUtdGFibGUtY29sdW1uLWxpbmsudHMiLCJuZzovL3ByaW1lLXRhYmxlL2xpYi9tb2RlbHMvcHJpbWUtdGFibGUtY29udGV4dC1tZW51LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgUHJpbWVUYWJsZVNlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG59XG4iLCJpbXBvcnQgeyBUcmVlTm9kZSB9IGZyb20gJ3ByaW1lbmcvYXBpJztcblxuaW1wb3J0IHsgUHJpbWVUYWJsZUNvbHVtbiB9IGZyb20gJy4vcHJpbWUtdGFibGUtY29sdW1uJztcbmltcG9ydCB7IFByaW1lVGFibGVDb250ZXh0TWVudSB9IGZyb20gJy4vcHJpbWUtdGFibGUtY29udGV4dC1tZW51JztcblxuZXhwb3J0IGNsYXNzIFByaW1lVGFibGVDb25maWcge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcmVzZXQ6ICdlYXN5JyB8ICdzdGFuZGFyZCcgfCAnZHJpbGxkb3duJyB8ICdmb3JtYXQnXG4gICAgKSB7XG4gICAgICAgIHN3aXRjaCAocHJlc2V0KSB7XG4gICAgICAgICAgICBjYXNlICdlYXN5JzpcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEJ1dHRvbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5lZGl0QnV0dG9uID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmFyY2hpdmVCdXR0b24gPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuZXhwb3J0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5zaXplID0gJ3NtJztcbiAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbGFibGUgPSBmYWxzZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnZHJpbGxkb3duJzpcbiAgICAgICAgICAgICAgICB0aGlzLmRyaWxsZG93biA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxhYmxlID0gZmFsc2U7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2Zvcm1hdCc6XG4gICAgICAgICAgICAgICAgdGhpcy5yb3dDb3VudCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuZXhwb3J0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5jb2x1bW5TZXR0aW5ncy5zZWxlY3RhYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5hdXRvTGF5b3V0ID0gZmFsc2U7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3N0YW5kYXJkJzpcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhpcy5lZGl0QnV0dG9uID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEJ1dHRvbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnJvd3NTaG93biA9IDEwO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcHVibGljIGRhdGE6IGFueVtdIHwgVHJlZU5vZGVbXTtcbiAgICBwdWJsaWMgY29sdW1uczogUHJpbWVUYWJsZUNvbHVtbjxhbnk+W107XG4gICAgcHVibGljIGRyaWxsZG93biA9IGZhbHNlO1xuXG4gICAgcHVibGljIHJvd0NvdW50ID0gdHJ1ZTtcbiAgICBwdWJsaWMgZmlsdGVycyA9IHRydWU7XG4gICAgcHVibGljIGV4cG9ydCA9IHRydWU7XG4gICAgcHVibGljIHNvcnRhYmxlID0gdHJ1ZTtcbiAgICBwdWJsaWMgc2Nyb2xsYWJsZSA9IGZhbHNlO1xuICAgIHB1YmxpYyBhZGRCdXR0b24gPSBmYWxzZTtcbiAgICBwdWJsaWMgZWRpdEJ1dHRvbiA9IGZhbHNlO1xuICAgIHB1YmxpYyBhcmNoaXZlQnV0dG9uID0gZmFsc2U7XG4gICAgcHVibGljIHJlc3BvbnNpdmUgPSB0cnVlO1xuICAgIHB1YmxpYyBhdXRvTGF5b3V0ID0gdHJ1ZTtcbiAgICBwdWJsaWMgcm93c1Nob3duOiBudW1iZXIgPSBudWxsO1xuICAgIHB1YmxpYyBzaXplOiAnc20nIHwgJ21kJyB8ICdsZycgPSAnbWQnO1xuICAgIHB1YmxpYyBjb2x1bW5TZXR0aW5ncyA9IHtcbiAgICAgICAgcmVzaXphYmxlOiBmYWxzZSxcbiAgICAgICAgc2VsZWN0YWJsZTogZmFsc2VcbiAgICB9O1xuICAgIHB1YmxpYyB0b29sdGlwOiBzdHJpbmcgPSBudWxsO1xuICAgIHB1YmxpYyBkcmlsbGRvd25Qcm9wZXJ0eTogc3RyaW5nID0gbnVsbDtcbiAgICBwdWJsaWMgbWVudTogUHJpbWVUYWJsZUNvbnRleHRNZW51ID0ge1xuICAgICAgICBlbmFibGVkOiBmYWxzZSxcbiAgICAgICAgbm9kZTogbnVsbCxcbiAgICAgICAgaXRlbXM6IFtdXG4gICAgfTtcblxuICAgIHB1YmxpYyBzZXREcmlsbGRvd25Qcm9wZXJ0eShwcm9wZXJ0eU5hbWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLmRyaWxsZG93blByb3BlcnR5ID0gcHJvcGVydHlOYW1lO1xuICAgIH1cblxuICAgIHB1YmxpYyBjbGVhcigpIHtcbiAgICAgICAgdGhpcy5kYXRhID0gW107XG4gICAgICAgIHRoaXMubWVudS5ub2RlID0gbnVsbDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0Q29sdW1ucyhjb2xzOiBQcmltZVRhYmxlQ29sdW1uPGFueT5bXSkge1xuICAgICAgICBjb2xzLmZvckVhY2goY29sID0+IGNvbC5maWVsZCA9IGNvbC5uYW1lKTtcbiAgICAgICAgdGhpcy5jb2x1bW5zID0gWy4uLmNvbHNdO1xuICAgIH1cbiAgICBwdWJsaWMgc2V0RGF0YShkYXRhOiBhbnlbXSkge1xuICAgICAgICB0aGlzLmRhdGEgPSBbLi4uZGF0YV07XG4gICAgfVxuICAgIHB1YmxpYyBzZXRUcmVlRGF0YShkYXRhOiBhbnlbXSkge1xuICAgICAgICBjb25zdCB0cmVlTm9kZURhdGEgPSB0aGlzLmdldFRyZWVOb2RlcyhkYXRhLCB0aGlzLmRyaWxsZG93blByb3BlcnR5KTtcbiAgICAgICAgdGhpcy5kYXRhID0gWy4uLnRyZWVOb2RlRGF0YV07XG4gICAgfVxuXG4gICAgcHVibGljIGRpc2FibGUocHJvcGVydGllczogc3RyaW5nW10pIHtcbiAgICAgICAgcHJvcGVydGllcy5mb3JFYWNoKHAgPT4gdGhpc1twXSA9IGZhbHNlKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZW5hYmxlKHByb3BlcnRpZXM6IHN0cmluZ1tdKSB7XG4gICAgICAgIHByb3BlcnRpZXMuZm9yRWFjaChwID0+IHRoaXNbcF0gPSB0cnVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFRyZWVOb2RlcyhkYXRhOiBhbnlbXSwga2V5OiBzdHJpbmcpOiBUcmVlTm9kZVtdIHtcbiAgICAgICAgbGV0IHRyYW5zZm9ybWVkOiBUcmVlTm9kZVtdID0gW107XG5cbiAgICAgICAgZGF0YS5tYXAoaXRlbSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0cmVlTm9kZTogVHJlZU5vZGUgPSB7IGRhdGE6IGl0ZW0gfTtcbiAgICAgICAgICAgIGlmIChpdGVtLmhhc093blByb3BlcnR5KGtleSkgJiYgaXRlbVtrZXldICYmIGl0ZW1ba2V5XS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgdHJlZU5vZGUuY2hpbGRyZW4gPSB0aGlzLmdldFRyZWVOb2RlcyhpdGVtW2tleV0sIGtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0cmFuc2Zvcm1lZCA9IFsuLi50cmFuc2Zvcm1lZCwgdHJlZU5vZGVdO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdHJhbnNmb3JtZWQ7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTZWxlY3RJdGVtLCBUcmVlTm9kZSB9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgUHJpbWVUYWJsZUNvbmZpZyB9IGZyb20gJy4vbW9kZWxzL3ByaW1lLXRhYmxlLWNvbmZpZyc7XG5pbXBvcnQgeyBQcmltZVRhYmxlQ29sdW1uIH0gZnJvbSAnLi9tb2RlbHMvcHJpbWUtdGFibGUtY29sdW1uJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYi1wcmltZS10YWJsZScsXG4gIHRlbXBsYXRlVXJsOiAnLi9wcmltZS10YWJsZS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlczogW11cbn0pXG5leHBvcnQgY2xhc3MgUHJpbWVUYWJsZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIHB1YmxpYyBfY29uZmlnID0gbmV3IFByaW1lVGFibGVDb25maWcoJ3N0YW5kYXJkJyk7XG4gIHB1YmxpYyBkYXRhTG9hZGVkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHB1YmxpYyBzaG93RmlsdGVycyA9IGZhbHNlO1xuICBwdWJsaWMgaGFzUmVvcmRlcmFibGVDb2x1bW4gPSBmYWxzZTtcbiAgcHVibGljIHJvd0NvdW50OiB7b3B0aW9uczogU2VsZWN0SXRlbVtdLCBzZWxlY3RlZDogbnVtYmVyfSA9IHtcbiAgICBvcHRpb25zOiBbXG4gICAgICB7bGFiZWw6ICdBbGwnLCB2YWx1ZTogbnVsbH0sXG4gICAgICB7bGFiZWw6ICc1JywgdmFsdWU6IDV9LFxuICAgICAge2xhYmVsOiAnMTAnLCB2YWx1ZTogMTB9LFxuICAgICAge2xhYmVsOiAnMjUnLCB2YWx1ZTogMjV9LFxuICAgICAge2xhYmVsOiAnNTAnLCB2YWx1ZTogNTB9LFxuICAgICAge2xhYmVsOiAnMTAwJywgdmFsdWU6IDEwMH1cbiAgICBdLFxuICAgIHNlbGVjdGVkOiBudWxsXG4gIH07XG4gIHB1YmxpYyBzZWxlY3RlZENvbHVtbnM6IGFueVtdO1xuICBwdWJsaWMgc2VsZWN0ZWRSb3dzOiBhbnlbXTtcblxuICBwdWJsaWMgc2NyZWVuSGVpZ2h0ID0gJzBweCc7XG5cbiAgcHJpdmF0ZSBjb2x1bW5zTG9hZGVkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG5cbiAgQElucHV0KCdjb25maWcnKVxuICBzZXQgY29uZmlnKGlucHV0OiBQcmltZVRhYmxlQ29uZmlnKSB7XG4gICAgaWYgKGlucHV0KSB7XG4gICAgICB0aGlzLl9jb25maWcgPSBpbnB1dDtcbiAgICAgIHRoaXMuc2V0dXBDb2x1bW5zKCk7XG4gICAgICB0aGlzLnNldHVwRGF0YSgpO1xuICAgICAgdGhpcy5yb3dDb3VudC5zZWxlY3RlZCA9IHRoaXMuX2NvbmZpZy5yb3dzU2hvd247XG4gICAgfVxuICB9XG5cbiAgQElucHV0KCdkYXRhJylcbiAgc2V0IGRhdGEoZGF0YTogYW55W10gfCBUcmVlTm9kZVtdKSB7XG4gICAgaWYgKGRhdGEpIHtcbiAgICAgIHRoaXMuX2NvbmZpZy5kcmlsbGRvd24gPyB0aGlzLl9jb25maWcuc2V0VHJlZURhdGEoZGF0YSlcbiAgICAgIDogdGhpcy5fY29uZmlnLnNldERhdGEoZGF0YSk7XG4gICAgICB0aGlzLnNldHVwRGF0YSgpO1xuICAgIH1cbiAgfVxuXG4gIEBJbnB1dCgnY29sdW1ucycpXG4gIHNldCBjb2x1bW5zKGNvbHVtbnM6IFByaW1lVGFibGVDb2x1bW48YW55PltdKSB7XG4gICAgdGhpcy5fY29uZmlnLnNldENvbHVtbnMoY29sdW1ucyk7XG4gICAgdGhpcy5zZXR1cENvbHVtbnMoKTtcbiAgfVxuXG4gIEBPdXRwdXQoKSBhZGQgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgpIGVkaXQgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgpIGFyY2hpdmUgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBASG9zdExpc3RlbmVyKCd3aW5kb3c6cmVzaXplJywgWyckZXZlbnQnXSlcbiAgb25SZXNpemUoZXZlbnQ/KSB7XG4gICAgdGhpcy5zY3JlZW5IZWlnaHQgPSAod2luZG93LmlubmVySGVpZ2h0IC0gMzUwKSArICdweCc7XG4gIH1cblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLm9uUmVzaXplKCk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAodGhpcy5oYXNSZW9yZGVyYWJsZUNvbHVtbikge1xuICAgICAgLy8gVG9EbzogRml4IGZvciBkcmlsbGRvd24gdGFibGVzXG4gICAgICB0aGlzLmRhdGFMb2FkZWQuc3Vic2NyaWJlKGRhdGFMb2FkZWQgPT4ge1xuICAgICAgICBpZiAoZGF0YUxvYWRlZCkge1xuICAgICAgICAgIGNvbnN0IHJlb3JkZXJhYmxlQ29sdW1uID0gdGhpcy5fY29uZmlnLmNvbHVtbnMuZmluZChjb2wgPT4gY29sLnJlb3JkZXJhYmxlID09PSB0cnVlKTtcbiAgICAgICAgICB0aGlzLl9jb25maWcuc29ydGFibGUgPSBmYWxzZTtcbiAgICAgICAgICAodGhpcy5fY29uZmlnLmRhdGEgYXMgYW55W10pLnNvcnQoKGl0ZW0xLCBpdGVtMikgPT4gaXRlbTFbcmVvcmRlcmFibGVDb2x1bW4ubmFtZV0gLSBpdGVtMltyZW9yZGVyYWJsZUNvbHVtbi5uYW1lXSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2V0dXBEYXRhKCkge1xuICAgIHRoaXMuZGF0YUxvYWRlZC5uZXh0KHRydWUpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXR1cENvbHVtbnMoKSB7XG4gICAgdGhpcy5zZWxlY3RlZENvbHVtbnMgPSB0aGlzLl9jb25maWcuY29sdW1ucy5maWx0ZXIoY29sID0+IGNvbC52aXNpYmxlICE9PSBmYWxzZSk7XG4gICAgdGhpcy5oYXNSZW9yZGVyYWJsZUNvbHVtbiA9IHRoaXMuX2NvbmZpZy5jb2x1bW5zLmZpbmRJbmRleChjb2wgPT4gY29sLnJlb3JkZXJhYmxlID09PSB0cnVlKSA+PSAwO1xuICAgIHRoaXMuX2NvbmZpZy5jb2x1bW5zLmZvckVhY2goY29sID0+IGNvbC5oYXNTZWxlY3QgPSBjb2wudmFsdWVzICYmIGNvbC52YWx1ZXMubGVuZ3RoID4gMSk7XG4gICAgdGhpcy5jb2x1bW5zTG9hZGVkLm5leHQodHJ1ZSk7XG4gIH1cblxuICByb3dSZW9yZGVyZWQgPSAoZXZlbnQ6IHtkcmFnSW5kZXg6IG51bWJlciwgZHJvcEluZGV4OiBudW1iZXJ9KSA9PiB7XG4gICAgaWYgKGV2ZW50LmRyb3BJbmRleCA+PSBldmVudC5kcmFnSW5kZXgpIHtcbiAgICAgIC8vIEJ1ZyBpbiBQcmltZU5nLCB3aGVuIGRyYWdnaW5nIHVwL1wib24gdG9wXCIgb2YgYW5vdGhlciByb3cgaXQgZ2V0cyB0aGUgd3JvbmcgaW5kZXhcbiAgICAgIGV2ZW50LmRyb3BJbmRleC0tO1xuICAgIH1cbiAgICBjb25zdCByZW9yZGVyYWJsZUNvbHVtbiA9IHRoaXMuX2NvbmZpZy5jb2x1bW5zLmZpbmQoY29sID0+IGNvbC5yZW9yZGVyYWJsZSA9PT0gdHJ1ZSk7XG4gICAgdGhpcy5fY29uZmlnLmRhdGFbZXZlbnQuZHJvcEluZGV4XVtyZW9yZGVyYWJsZUNvbHVtbi5uYW1lXSA9IGV2ZW50LmRyb3BJbmRleCArIDE7XG4gICAgaWYgKGV2ZW50LmRyb3BJbmRleCA+IGV2ZW50LmRyYWdJbmRleCkge1xuICAgICAgZm9yIChsZXQgaSA9IGV2ZW50LmRyYWdJbmRleDsgaSA8IGV2ZW50LmRyb3BJbmRleDsgaSsrKSB7XG4gICAgICAgIHRoaXMuX2NvbmZpZy5kYXRhW2ldW3Jlb3JkZXJhYmxlQ29sdW1uLm5hbWVdID0gaSArIDE7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAobGV0IGkgPSBldmVudC5kcm9wSW5kZXg7IGkgPD0gZXZlbnQuZHJhZ0luZGV4OyBpKyspIHtcbiAgICAgICAgdGhpcy5fY29uZmlnLmRhdGFbaV1bcmVvcmRlcmFibGVDb2x1bW4ubmFtZV0gPSBpICsgMTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB0b2dnbGVGaWx0ZXJzID0gKCkgPT4gdGhpcy5zaG93RmlsdGVycyA9ICF0aGlzLnNob3dGaWx0ZXJzO1xuXG4gIGdldENlbGxWYWx1ZShyb3c6IGFueSwgY29sOiBQcmltZVRhYmxlQ29sdW1uPGFueT4pIHtcbiAgICBpZiAoY29sLnJlbmRlcikge1xuICAgICAgcmV0dXJuIGNvbC5yZW5kZXIocm93KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMucmVzb2x2ZUtleShjb2wubmFtZSwgcm93KTtcbiAgICB9XG4gIH1cblxuICBnZXRMaW5rVmFsdWUocm93OiBhbnksIGNvbDogUHJpbWVUYWJsZUNvbHVtbjxhbnk+KSB7XG4gICAgY29uc3QgZHluYW1pY1BhdGggPSBjb2wud2l0aExpbmsuZHluYW1pYyA/ICcvJyArIHRoaXMucmVzb2x2ZUtleShjb2wud2l0aExpbmsuZHluYW1pYywgcm93KSA6ICcnO1xuICAgIHJldHVybiBjb2wud2l0aExpbmsuc3RhdGljUGF0aCArIGR5bmFtaWNQYXRoO1xuICB9XG5cbiAgcHJpdmF0ZSByZXNvbHZlS2V5ID0gKGtleTogc3RyaW5nLCBvYmo6IGFueSk6IHN0cmluZyA9PiB7XG4gICAgcmV0dXJuIGtleS5zcGxpdCgnLicpLnJlZHVjZSgocHJldjogYW55LCBjdXJyOiBhbnkpID0+IHByZXYgPyBwcmV2W2N1cnJdIDogbnVsbCAsIG9iaik7XG4gIH1cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEJyb3dzZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7IEJyb3dzZXJBbmltYXRpb25zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zJztcbmltcG9ydCB7IENvbnRleHRNZW51TW9kdWxlIH0gZnJvbSAncHJpbWVuZy9jb250ZXh0bWVudSc7XG5pbXBvcnQgeyBEcm9wZG93bk1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvZHJvcGRvd24nO1xuaW1wb3J0IHsgTXVsdGlTZWxlY3RNb2R1bGUgfSBmcm9tICdwcmltZW5nL211bHRpc2VsZWN0JztcbmltcG9ydCB7IFRhYmxlTW9kdWxlIH0gZnJvbSAncHJpbWVuZy90YWJsZSc7XG5pbXBvcnQgeyBUb29sdGlwTW9kdWxlIH0gZnJvbSAncHJpbWVuZy90b29sdGlwJztcbmltcG9ydCB7IFRyZWVUYWJsZU1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvdHJlZXRhYmxlJztcblxuaW1wb3J0IHsgUHJpbWVUYWJsZUNvbXBvbmVudCB9IGZyb20gJy4vcHJpbWUtdGFibGUuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIEJyb3dzZXJNb2R1bGUsXG4gICAgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBUYWJsZU1vZHVsZSxcbiAgICBUcmVlVGFibGVNb2R1bGUsXG4gICAgTXVsdGlTZWxlY3RNb2R1bGUsXG4gICAgRHJvcGRvd25Nb2R1bGUsXG4gICAgVG9vbHRpcE1vZHVsZSxcbiAgICBDb250ZXh0TWVudU1vZHVsZSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbUHJpbWVUYWJsZUNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtQcmltZVRhYmxlQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBQcmltZVRhYmxlTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgUHJpbWVUYWJsZUNvbHVtbkxpbmsgfSBmcm9tICcuL3ByaW1lLXRhYmxlLWNvbHVtbi1saW5rJztcblxuZXhwb3J0IGNsYXNzIFByaW1lVGFibGVDb2x1bW48VD4ge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgZGlzcGxheU5hbWU6IHN0cmluZyxcbiAgICAgICAgcHVibGljIG5hbWU6IHN0cmluZyxcbiAgICAgICAgcHVibGljIGVkaXRhYmxlID0gZmFsc2UsXG4gICAgICAgIHB1YmxpYyByZW9yZGVyYWJsZSA9IGZhbHNlLFxuICAgICAgICBwdWJsaWMgdmlzaWJsZSA9IHRydWUsXG4gICAgICAgIHB1YmxpYyByZW5kZXI/OiAocm93OiBUKSA9PiBhbnksXG4gICAgICAgIHB1YmxpYyBleHRyYUNsYXNzPzogKHJvdzogVCkgPT4gc3RyaW5nLFxuICAgICAgICBwdWJsaWMgdmFsdWVzPzogYW55W11cbiAgICApIHsgfVxuICAgIGhhc1NlbGVjdCA/ID0gZmFsc2U7XG4gICAgW2tleTogc3RyaW5nXTogYW55O1xuICAgIHdpdGhMaW5rOiBQcmltZVRhYmxlQ29sdW1uTGluayA9IG51bGw7XG59XG4iLCJleHBvcnQgY2xhc3MgUHJpbWVUYWJsZUNvbHVtbkxpbmsge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgc3RhdGljUGF0aDogc3RyaW5nLFxuICAgICAgICBwdWJsaWMgZHluYW1pYz86IHN0cmluZ1xuICAgICkgeyB9XG59XG4iLCJpbXBvcnQgeyBNZW51SXRlbSwgVHJlZU5vZGUgfSBmcm9tICdwcmltZW5nL2FwaSc7XG5cbmV4cG9ydCBjbGFzcyBQcmltZVRhYmxlQ29udGV4dE1lbnUge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgZW5hYmxlZDogYm9vbGVhbixcbiAgICAgICAgcHVibGljIG5vZGU6IFRyZWVOb2RlIHwgYW55LFxuICAgICAgICBwdWJsaWMgaXRlbXM6IE1lbnVJdGVtW11cbiAgICApIHsgfVxufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7SUFPRTtLQUFpQjs7Z0JBTGxCLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7Ozs7OzRCQUpEOzs7Ozs7O0lDS0E7SUFDSSwwQkFDSSxNQUFvRDt5QkFnQ3JDLEtBQUs7d0JBRU4sSUFBSTt1QkFDTCxJQUFJO3NCQUNMLElBQUk7d0JBQ0YsSUFBSTswQkFDRixLQUFLO3lCQUNOLEtBQUs7MEJBQ0osS0FBSzs2QkFDRixLQUFLOzBCQUNSLElBQUk7MEJBQ0osSUFBSTt5QkFDRyxJQUFJO29CQUNHLElBQUk7OEJBQ2Q7WUFDcEIsU0FBUyxFQUFFLEtBQUs7WUFDaEIsVUFBVSxFQUFFLEtBQUs7U0FDcEI7dUJBQ3dCLElBQUk7aUNBQ00sSUFBSTtvQkFDRjtZQUNqQyxPQUFPLEVBQUUsS0FBSztZQUNkLElBQUksRUFBRSxJQUFJO1lBQ1YsS0FBSyxFQUFFLEVBQUU7U0FDWjtRQXRERyxRQUFRLE1BQU07WUFDVixLQUFLLE1BQU07Z0JBQ1AsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7Z0JBQ3RCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO2dCQUN2QixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztnQkFDMUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7Z0JBQ3BCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO2dCQUNqQixJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztnQkFDNUIsTUFBTTtZQUNOLEtBQUssV0FBVztnQkFDWixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztnQkFDdEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7Z0JBQzVCLE1BQU07WUFDTixLQUFLLFFBQVE7Z0JBQ1QsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7Z0JBQ3RCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO2dCQUNwQixJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7Z0JBQ3ZDLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO2dCQUM1QixNQUFNO1lBQ04sS0FBSyxVQUFVLENBQUM7WUFDaEI7Z0JBQ0ksSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO2dCQUN0QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztnQkFDdkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7Z0JBQ3hCLE1BQU07U0FDVDtLQUNKOzs7OztJQTZCTSwrQ0FBb0I7Ozs7Y0FBQyxZQUFvQjtRQUM1QyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsWUFBWSxDQUFDOzs7OztJQUduQyxnQ0FBSzs7OztRQUNSLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ2YsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDOzs7Ozs7SUFHbkIscUNBQVU7Ozs7Y0FBQyxJQUE2QjtRQUMzQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxZQUFTLEdBQUcsQ0FBQyxJQUFJLEdBQUEsQ0FBQyxDQUFDO1FBQzFDLElBQUksQ0FBQyxPQUFPLFlBQU8sSUFBSSxDQUFDLENBQUM7Ozs7OztJQUV0QixrQ0FBTzs7OztjQUFDLElBQVc7UUFDdEIsSUFBSSxDQUFDLElBQUksWUFBTyxJQUFJLENBQUMsQ0FBQzs7Ozs7O0lBRW5CLHNDQUFXOzs7O2NBQUMsSUFBVzs7UUFDMUIsSUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDckUsSUFBSSxDQUFDLElBQUksWUFBTyxZQUFZLENBQUMsQ0FBQzs7Ozs7O0lBRzNCLGtDQUFPOzs7O2NBQUMsVUFBb0I7O1FBQy9CLFVBQVUsQ0FBQyxPQUFPLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxLQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxHQUFBLENBQUMsQ0FBQzs7Ozs7O0lBR3RDLGlDQUFNOzs7O2NBQUMsVUFBb0I7O1FBQzlCLFVBQVUsQ0FBQyxPQUFPLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxLQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxHQUFBLENBQUMsQ0FBQzs7Ozs7OztJQUdwQyx1Q0FBWTs7Ozs7Y0FBQyxJQUFXLEVBQUUsR0FBVzs7O1FBQ3pDLElBQUksV0FBVyxHQUFlLEVBQUUsQ0FBQztRQUVqQyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQUEsSUFBSTs7WUFDVCxJQUFNLFFBQVEsR0FBYSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQztZQUMxQyxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUMvRCxRQUFRLENBQUMsUUFBUSxHQUFHLEtBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2FBQ3pEO1lBQ0QsV0FBVyxZQUFPLFdBQVcsR0FBRSxRQUFRLEVBQUMsQ0FBQztTQUM1QyxDQUFDLENBQUM7UUFFSCxPQUFPLFdBQVcsQ0FBQzs7MkJBekczQjtJQTJHQzs7Ozs7O0FDM0dEO0lBb0VFO1FBQUEsaUJBRUM7dUJBMURnQixJQUFJLGdCQUFnQixDQUFDLFVBQVUsQ0FBQzswQkFDN0IsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDOzJCQUNsQyxLQUFLO29DQUNJLEtBQUs7d0JBQzBCO1lBQzNELE9BQU8sRUFBRTtnQkFDUCxFQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBQztnQkFDM0IsRUFBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUM7Z0JBQ3RCLEVBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFDO2dCQUN4QixFQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBQztnQkFDeEIsRUFBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUM7Z0JBQ3hCLEVBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFDO2FBQzNCO1lBQ0QsUUFBUSxFQUFFLElBQUk7U0FDZjs0QkFJcUIsS0FBSzs2QkFFSCxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUM7bUJBMkIzQyxJQUFJLFlBQVksRUFBTztvQkFDdEIsSUFBSSxZQUFZLEVBQU87dUJBQ3BCLElBQUksWUFBWSxFQUFPOzRCQW1DNUIsVUFBQyxLQUE2QztZQUMzRCxJQUFJLEtBQUssQ0FBQyxTQUFTLElBQUksS0FBSyxDQUFDLFNBQVMsRUFBRTs7Z0JBRXRDLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQzthQUNuQjs7WUFDRCxJQUFNLGlCQUFpQixHQUFHLEtBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsQ0FBQyxXQUFXLEtBQUssSUFBSSxHQUFBLENBQUMsQ0FBQztZQUNyRixLQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7WUFDakYsSUFBSSxLQUFLLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxTQUFTLEVBQUU7Z0JBQ3JDLEtBQUssSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUUsRUFBRTtvQkFDdEQsS0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDdEQ7YUFDRjtpQkFBTTtnQkFDTCxLQUFLLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQyxJQUFJLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLEVBQUU7b0JBQ3ZELEtBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7aUJBQ3REO2FBQ0Y7U0FDRjs2QkFFZSxjQUFNLE9BQUEsS0FBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLEtBQUksQ0FBQyxXQUFXLEdBQUE7MEJBZXJDLFVBQUMsR0FBVyxFQUFFLEdBQVE7WUFDekMsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFDLElBQVMsRUFBRSxJQUFTLElBQUssT0FBQSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksR0FBQSxFQUFHLEdBQUcsQ0FBQyxDQUFDO1NBQ3hGO1FBOURDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUNqQjtJQXBDRCxzQkFDSSx1Q0FBTTs7Ozs7UUFEVixVQUNXLEtBQXVCO1lBQ2hDLElBQUksS0FBSyxFQUFFO2dCQUNULElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO2dCQUNyQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7Z0JBQ3BCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQkFDakIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUM7YUFDakQ7U0FDRjs7O09BQUE7SUFFRCxzQkFDSSxxQ0FBSTs7Ozs7UUFEUixVQUNTLElBQXdCO1lBQy9CLElBQUksSUFBSSxFQUFFO2dCQUNSLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQztzQkFDckQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzdCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQzthQUNsQjtTQUNGOzs7T0FBQTtJQUVELHNCQUNJLHdDQUFPOzs7OztRQURYLFVBQ1ksT0FBZ0M7WUFDMUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDakMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQ3JCOzs7T0FBQTs7Ozs7SUFPRCxzQ0FBUTs7OztJQURSLFVBQ1MsS0FBTTtRQUNiLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxNQUFNLENBQUMsV0FBVyxHQUFHLEdBQUcsSUFBSSxJQUFJLENBQUM7S0FDdkQ7Ozs7SUFNRCxzQ0FBUTs7O0lBQVI7UUFBQSxpQkFXQztRQVZDLElBQUksSUFBSSxDQUFDLG9CQUFvQixFQUFFOztZQUU3QixJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxVQUFBLFVBQVU7Z0JBQ2xDLElBQUksVUFBVSxFQUFFOztvQkFDZCxJQUFNLG1CQUFpQixHQUFHLEtBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsQ0FBQyxXQUFXLEtBQUssSUFBSSxHQUFBLENBQUMsQ0FBQztvQkFDckYsS0FBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO29CQUM5QixtQkFBQyxLQUFJLENBQUMsT0FBTyxDQUFDLElBQWEsR0FBRSxJQUFJLENBQUMsVUFBQyxLQUFLLEVBQUUsS0FBSyxJQUFLLE9BQUEsS0FBSyxDQUFDLG1CQUFpQixDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxtQkFBaUIsQ0FBQyxJQUFJLENBQUMsR0FBQSxDQUFDLENBQUM7aUJBQ3BIO2FBQ0YsQ0FBQyxDQUFDO1NBQ0o7S0FDRjs7OztJQUVPLHVDQUFTOzs7O1FBQ2YsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Ozs7O0lBR3JCLDBDQUFZOzs7O1FBQ2xCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxDQUFDLE9BQU8sS0FBSyxLQUFLLEdBQUEsQ0FBQyxDQUFDO1FBQ2pGLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLENBQUMsV0FBVyxLQUFLLElBQUksR0FBQSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDLE1BQU0sSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUEsQ0FBQyxDQUFDO1FBQ3pGLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDOzs7Ozs7O0lBdUJoQywwQ0FBWTs7Ozs7SUFBWixVQUFhLEdBQVEsRUFBRSxHQUEwQjtRQUMvQyxJQUFJLEdBQUcsQ0FBQyxNQUFNLEVBQUU7WUFDZCxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDeEI7YUFBTTtZQUNMLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQ3ZDO0tBQ0Y7Ozs7OztJQUVELDBDQUFZOzs7OztJQUFaLFVBQWEsR0FBUSxFQUFFLEdBQTBCOztRQUMvQyxJQUFNLFdBQVcsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDLE9BQU8sR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDakcsT0FBTyxHQUFHLENBQUMsUUFBUSxDQUFDLFVBQVUsR0FBRyxXQUFXLENBQUM7S0FDOUM7O2dCQXpIRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGVBQWU7b0JBQ3pCLGlwTkFBMkM7aUJBRTVDOzs7Ozt5QkF3QkUsS0FBSyxTQUFDLFFBQVE7dUJBVWQsS0FBSyxTQUFDLE1BQU07MEJBU1osS0FBSyxTQUFDLFNBQVM7c0JBTWYsTUFBTTt1QkFDTixNQUFNOzBCQUNOLE1BQU07MkJBRU4sWUFBWSxTQUFDLGVBQWUsRUFBRSxDQUFDLFFBQVEsQ0FBQzs7OEJBL0QzQzs7Ozs7OztBQ0FBOzs7O2dCQWFDLFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsYUFBYTt3QkFDYix1QkFBdUI7d0JBQ3ZCLFdBQVc7d0JBQ1gsbUJBQW1CO3dCQUNuQixXQUFXO3dCQUNYLGVBQWU7d0JBQ2YsaUJBQWlCO3dCQUNqQixjQUFjO3dCQUNkLGFBQWE7d0JBQ2IsaUJBQWlCO3FCQUNsQjtvQkFDRCxZQUFZLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQztvQkFDbkMsT0FBTyxFQUFFLENBQUMsbUJBQW1CLENBQUM7aUJBQy9COzsyQkE1QkQ7Ozs7Ozs7Ozs7QUNFQTs7O0FBQUE7SUFDSSwwQkFDVyxhQUNBLE1BQ0EsVUFDQSxhQUNBLFNBQ0EsUUFDQSxZQUNBOzs7O1FBUEEsZ0JBQVcsR0FBWCxXQUFXO1FBQ1gsU0FBSSxHQUFKLElBQUk7UUFDSixhQUFRLEdBQVIsUUFBUTtRQUNSLGdCQUFXLEdBQVgsV0FBVztRQUNYLFlBQU8sR0FBUCxPQUFPO1FBQ1AsV0FBTSxHQUFOLE1BQU07UUFDTixlQUFVLEdBQVYsVUFBVTtRQUNWLFdBQU0sR0FBTixNQUFNO3lCQUVILEtBQUs7d0JBRWMsSUFBSTtLQUhoQzsyQkFaVDtJQWdCQzs7Ozs7O0FDaEJELElBQUE7SUFDSSw4QkFDVyxZQUNBO1FBREEsZUFBVSxHQUFWLFVBQVU7UUFDVixZQUFPLEdBQVAsT0FBTztLQUNiOytCQUpUO0lBS0M7Ozs7OztBQ0hELElBQUE7SUFDSSwrQkFDVyxTQUNBLE1BQ0E7UUFGQSxZQUFPLEdBQVAsT0FBTztRQUNQLFNBQUksR0FBSixJQUFJO1FBQ0osVUFBSyxHQUFMLEtBQUs7S0FDWDtnQ0FQVDtJQVFDOzs7Ozs7Ozs7Ozs7OzsifQ==