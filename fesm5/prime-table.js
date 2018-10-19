import { Injectable, Component, EventEmitter, HostListener, Input, Output, defineInjectable, NgModule } from '@angular/core';
import { __spread } from 'tslib';
import { BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
                        CommonModule,
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpbWUtdGFibGUuanMubWFwIiwic291cmNlcyI6WyJuZzovL3ByaW1lLXRhYmxlL2xpYi9wcmltZS10YWJsZS5zZXJ2aWNlLnRzIiwibmc6Ly9wcmltZS10YWJsZS9saWIvbW9kZWxzL3ByaW1lLXRhYmxlLWNvbmZpZy50cyIsIm5nOi8vcHJpbWUtdGFibGUvbGliL3ByaW1lLXRhYmxlLmNvbXBvbmVudC50cyIsIm5nOi8vcHJpbWUtdGFibGUvbGliL3ByaW1lLXRhYmxlLm1vZHVsZS50cyIsIm5nOi8vcHJpbWUtdGFibGUvbGliL21vZGVscy9wcmltZS10YWJsZS1jb2x1bW4udHMiLCJuZzovL3ByaW1lLXRhYmxlL2xpYi9tb2RlbHMvcHJpbWUtdGFibGUtY29sdW1uLWxpbmsudHMiLCJuZzovL3ByaW1lLXRhYmxlL2xpYi9tb2RlbHMvcHJpbWUtdGFibGUtY29udGV4dC1tZW51LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgUHJpbWVUYWJsZVNlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG59XG4iLCJpbXBvcnQgeyBUcmVlTm9kZSB9IGZyb20gJ3ByaW1lbmcvYXBpJztcblxuaW1wb3J0IHsgUHJpbWVUYWJsZUNvbHVtbiB9IGZyb20gJy4vcHJpbWUtdGFibGUtY29sdW1uJztcbmltcG9ydCB7IFByaW1lVGFibGVDb250ZXh0TWVudSB9IGZyb20gJy4vcHJpbWUtdGFibGUtY29udGV4dC1tZW51JztcblxuZXhwb3J0IGNsYXNzIFByaW1lVGFibGVDb25maWcge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcmVzZXQ6ICdlYXN5JyB8ICdzdGFuZGFyZCcgfCAnZHJpbGxkb3duJyB8ICdmb3JtYXQnXG4gICAgKSB7XG4gICAgICAgIHN3aXRjaCAocHJlc2V0KSB7XG4gICAgICAgICAgICBjYXNlICdlYXN5JzpcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEJ1dHRvbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5lZGl0QnV0dG9uID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmFyY2hpdmVCdXR0b24gPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuZXhwb3J0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5zaXplID0gJ3NtJztcbiAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbGFibGUgPSBmYWxzZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnZHJpbGxkb3duJzpcbiAgICAgICAgICAgICAgICB0aGlzLmRyaWxsZG93biA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxhYmxlID0gZmFsc2U7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2Zvcm1hdCc6XG4gICAgICAgICAgICAgICAgdGhpcy5yb3dDb3VudCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuZXhwb3J0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5jb2x1bW5TZXR0aW5ncy5zZWxlY3RhYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5hdXRvTGF5b3V0ID0gZmFsc2U7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3N0YW5kYXJkJzpcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhpcy5lZGl0QnV0dG9uID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEJ1dHRvbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnJvd3NTaG93biA9IDEwO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcHVibGljIGRhdGE6IGFueVtdIHwgVHJlZU5vZGVbXTtcbiAgICBwdWJsaWMgY29sdW1uczogUHJpbWVUYWJsZUNvbHVtbjxhbnk+W107XG4gICAgcHVibGljIGRyaWxsZG93biA9IGZhbHNlO1xuXG4gICAgcHVibGljIHJvd0NvdW50ID0gdHJ1ZTtcbiAgICBwdWJsaWMgZmlsdGVycyA9IHRydWU7XG4gICAgcHVibGljIGV4cG9ydCA9IHRydWU7XG4gICAgcHVibGljIHNvcnRhYmxlID0gdHJ1ZTtcbiAgICBwdWJsaWMgc2Nyb2xsYWJsZSA9IGZhbHNlO1xuICAgIHB1YmxpYyBhZGRCdXR0b24gPSBmYWxzZTtcbiAgICBwdWJsaWMgZWRpdEJ1dHRvbiA9IGZhbHNlO1xuICAgIHB1YmxpYyBhcmNoaXZlQnV0dG9uID0gZmFsc2U7XG4gICAgcHVibGljIHJlc3BvbnNpdmUgPSB0cnVlO1xuICAgIHB1YmxpYyBhdXRvTGF5b3V0ID0gdHJ1ZTtcbiAgICBwdWJsaWMgcm93c1Nob3duOiBudW1iZXIgPSBudWxsO1xuICAgIHB1YmxpYyBzaXplOiAnc20nIHwgJ21kJyB8ICdsZycgPSAnbWQnO1xuICAgIHB1YmxpYyBjb2x1bW5TZXR0aW5ncyA9IHtcbiAgICAgICAgcmVzaXphYmxlOiBmYWxzZSxcbiAgICAgICAgc2VsZWN0YWJsZTogZmFsc2VcbiAgICB9O1xuICAgIHB1YmxpYyB0b29sdGlwOiBzdHJpbmcgPSBudWxsO1xuICAgIHB1YmxpYyBkcmlsbGRvd25Qcm9wZXJ0eTogc3RyaW5nID0gbnVsbDtcbiAgICBwdWJsaWMgbWVudTogUHJpbWVUYWJsZUNvbnRleHRNZW51ID0ge1xuICAgICAgICBlbmFibGVkOiBmYWxzZSxcbiAgICAgICAgbm9kZTogbnVsbCxcbiAgICAgICAgaXRlbXM6IFtdXG4gICAgfTtcblxuICAgIHB1YmxpYyBzZXREcmlsbGRvd25Qcm9wZXJ0eShwcm9wZXJ0eU5hbWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLmRyaWxsZG93blByb3BlcnR5ID0gcHJvcGVydHlOYW1lO1xuICAgIH1cblxuICAgIHB1YmxpYyBjbGVhcigpIHtcbiAgICAgICAgdGhpcy5kYXRhID0gW107XG4gICAgICAgIHRoaXMubWVudS5ub2RlID0gbnVsbDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0Q29sdW1ucyhjb2xzOiBQcmltZVRhYmxlQ29sdW1uPGFueT5bXSkge1xuICAgICAgICBjb2xzLmZvckVhY2goY29sID0+IGNvbC5maWVsZCA9IGNvbC5uYW1lKTtcbiAgICAgICAgdGhpcy5jb2x1bW5zID0gWy4uLmNvbHNdO1xuICAgIH1cbiAgICBwdWJsaWMgc2V0RGF0YShkYXRhOiBhbnlbXSkge1xuICAgICAgICB0aGlzLmRhdGEgPSBbLi4uZGF0YV07XG4gICAgfVxuICAgIHB1YmxpYyBzZXRUcmVlRGF0YShkYXRhOiBhbnlbXSkge1xuICAgICAgICBjb25zdCB0cmVlTm9kZURhdGEgPSB0aGlzLmdldFRyZWVOb2RlcyhkYXRhLCB0aGlzLmRyaWxsZG93blByb3BlcnR5KTtcbiAgICAgICAgdGhpcy5kYXRhID0gWy4uLnRyZWVOb2RlRGF0YV07XG4gICAgfVxuXG4gICAgcHVibGljIGRpc2FibGUocHJvcGVydGllczogc3RyaW5nW10pIHtcbiAgICAgICAgcHJvcGVydGllcy5mb3JFYWNoKHAgPT4gdGhpc1twXSA9IGZhbHNlKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZW5hYmxlKHByb3BlcnRpZXM6IHN0cmluZ1tdKSB7XG4gICAgICAgIHByb3BlcnRpZXMuZm9yRWFjaChwID0+IHRoaXNbcF0gPSB0cnVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFRyZWVOb2RlcyhkYXRhOiBhbnlbXSwga2V5OiBzdHJpbmcpOiBUcmVlTm9kZVtdIHtcbiAgICAgICAgbGV0IHRyYW5zZm9ybWVkOiBUcmVlTm9kZVtdID0gW107XG5cbiAgICAgICAgZGF0YS5tYXAoaXRlbSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0cmVlTm9kZTogVHJlZU5vZGUgPSB7IGRhdGE6IGl0ZW0gfTtcbiAgICAgICAgICAgIGlmIChpdGVtLmhhc093blByb3BlcnR5KGtleSkgJiYgaXRlbVtrZXldICYmIGl0ZW1ba2V5XS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgdHJlZU5vZGUuY2hpbGRyZW4gPSB0aGlzLmdldFRyZWVOb2RlcyhpdGVtW2tleV0sIGtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0cmFuc2Zvcm1lZCA9IFsuLi50cmFuc2Zvcm1lZCwgdHJlZU5vZGVdO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdHJhbnNmb3JtZWQ7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTZWxlY3RJdGVtLCBUcmVlTm9kZSB9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgUHJpbWVUYWJsZUNvbmZpZyB9IGZyb20gJy4vbW9kZWxzL3ByaW1lLXRhYmxlLWNvbmZpZyc7XG5pbXBvcnQgeyBQcmltZVRhYmxlQ29sdW1uIH0gZnJvbSAnLi9tb2RlbHMvcHJpbWUtdGFibGUtY29sdW1uJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYi1wcmltZS10YWJsZScsXG4gIHRlbXBsYXRlVXJsOiAnLi9wcmltZS10YWJsZS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlczogW11cbn0pXG5leHBvcnQgY2xhc3MgUHJpbWVUYWJsZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIHB1YmxpYyBfY29uZmlnID0gbmV3IFByaW1lVGFibGVDb25maWcoJ3N0YW5kYXJkJyk7XG4gIHB1YmxpYyBkYXRhTG9hZGVkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHB1YmxpYyBzaG93RmlsdGVycyA9IGZhbHNlO1xuICBwdWJsaWMgaGFzUmVvcmRlcmFibGVDb2x1bW4gPSBmYWxzZTtcbiAgcHVibGljIHJvd0NvdW50OiB7b3B0aW9uczogU2VsZWN0SXRlbVtdLCBzZWxlY3RlZDogbnVtYmVyfSA9IHtcbiAgICBvcHRpb25zOiBbXG4gICAgICB7bGFiZWw6ICdBbGwnLCB2YWx1ZTogbnVsbH0sXG4gICAgICB7bGFiZWw6ICc1JywgdmFsdWU6IDV9LFxuICAgICAge2xhYmVsOiAnMTAnLCB2YWx1ZTogMTB9LFxuICAgICAge2xhYmVsOiAnMjUnLCB2YWx1ZTogMjV9LFxuICAgICAge2xhYmVsOiAnNTAnLCB2YWx1ZTogNTB9LFxuICAgICAge2xhYmVsOiAnMTAwJywgdmFsdWU6IDEwMH1cbiAgICBdLFxuICAgIHNlbGVjdGVkOiBudWxsXG4gIH07XG4gIHB1YmxpYyBzZWxlY3RlZENvbHVtbnM6IGFueVtdO1xuICBwdWJsaWMgc2VsZWN0ZWRSb3dzOiBhbnlbXTtcblxuICBwdWJsaWMgc2NyZWVuSGVpZ2h0ID0gJzBweCc7XG5cbiAgcHJpdmF0ZSBjb2x1bW5zTG9hZGVkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG5cbiAgQElucHV0KCdjb25maWcnKVxuICBzZXQgY29uZmlnKGlucHV0OiBQcmltZVRhYmxlQ29uZmlnKSB7XG4gICAgaWYgKGlucHV0KSB7XG4gICAgICB0aGlzLl9jb25maWcgPSBpbnB1dDtcbiAgICAgIHRoaXMuc2V0dXBDb2x1bW5zKCk7XG4gICAgICB0aGlzLnNldHVwRGF0YSgpO1xuICAgICAgdGhpcy5yb3dDb3VudC5zZWxlY3RlZCA9IHRoaXMuX2NvbmZpZy5yb3dzU2hvd247XG4gICAgfVxuICB9XG5cbiAgQElucHV0KCdkYXRhJylcbiAgc2V0IGRhdGEoZGF0YTogYW55W10gfCBUcmVlTm9kZVtdKSB7XG4gICAgaWYgKGRhdGEpIHtcbiAgICAgIHRoaXMuX2NvbmZpZy5kcmlsbGRvd24gPyB0aGlzLl9jb25maWcuc2V0VHJlZURhdGEoZGF0YSlcbiAgICAgIDogdGhpcy5fY29uZmlnLnNldERhdGEoZGF0YSk7XG4gICAgICB0aGlzLnNldHVwRGF0YSgpO1xuICAgIH1cbiAgfVxuXG4gIEBJbnB1dCgnY29sdW1ucycpXG4gIHNldCBjb2x1bW5zKGNvbHVtbnM6IFByaW1lVGFibGVDb2x1bW48YW55PltdKSB7XG4gICAgdGhpcy5fY29uZmlnLnNldENvbHVtbnMoY29sdW1ucyk7XG4gICAgdGhpcy5zZXR1cENvbHVtbnMoKTtcbiAgfVxuXG4gIEBPdXRwdXQoKSBhZGQgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgpIGVkaXQgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgpIGFyY2hpdmUgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBASG9zdExpc3RlbmVyKCd3aW5kb3c6cmVzaXplJywgWyckZXZlbnQnXSlcbiAgb25SZXNpemUoZXZlbnQ/KSB7XG4gICAgdGhpcy5zY3JlZW5IZWlnaHQgPSAod2luZG93LmlubmVySGVpZ2h0IC0gMzUwKSArICdweCc7XG4gIH1cblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLm9uUmVzaXplKCk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAodGhpcy5oYXNSZW9yZGVyYWJsZUNvbHVtbikge1xuICAgICAgLy8gVG9EbzogRml4IGZvciBkcmlsbGRvd24gdGFibGVzXG4gICAgICB0aGlzLmRhdGFMb2FkZWQuc3Vic2NyaWJlKGRhdGFMb2FkZWQgPT4ge1xuICAgICAgICBpZiAoZGF0YUxvYWRlZCkge1xuICAgICAgICAgIGNvbnN0IHJlb3JkZXJhYmxlQ29sdW1uID0gdGhpcy5fY29uZmlnLmNvbHVtbnMuZmluZChjb2wgPT4gY29sLnJlb3JkZXJhYmxlID09PSB0cnVlKTtcbiAgICAgICAgICB0aGlzLl9jb25maWcuc29ydGFibGUgPSBmYWxzZTtcbiAgICAgICAgICAodGhpcy5fY29uZmlnLmRhdGEgYXMgYW55W10pLnNvcnQoKGl0ZW0xLCBpdGVtMikgPT4gaXRlbTFbcmVvcmRlcmFibGVDb2x1bW4ubmFtZV0gLSBpdGVtMltyZW9yZGVyYWJsZUNvbHVtbi5uYW1lXSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2V0dXBEYXRhKCkge1xuICAgIHRoaXMuZGF0YUxvYWRlZC5uZXh0KHRydWUpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXR1cENvbHVtbnMoKSB7XG4gICAgdGhpcy5zZWxlY3RlZENvbHVtbnMgPSB0aGlzLl9jb25maWcuY29sdW1ucy5maWx0ZXIoY29sID0+IGNvbC52aXNpYmxlICE9PSBmYWxzZSk7XG4gICAgdGhpcy5oYXNSZW9yZGVyYWJsZUNvbHVtbiA9IHRoaXMuX2NvbmZpZy5jb2x1bW5zLmZpbmRJbmRleChjb2wgPT4gY29sLnJlb3JkZXJhYmxlID09PSB0cnVlKSA+PSAwO1xuICAgIHRoaXMuX2NvbmZpZy5jb2x1bW5zLmZvckVhY2goY29sID0+IGNvbC5oYXNTZWxlY3QgPSBjb2wudmFsdWVzICYmIGNvbC52YWx1ZXMubGVuZ3RoID4gMSk7XG4gICAgdGhpcy5jb2x1bW5zTG9hZGVkLm5leHQodHJ1ZSk7XG4gIH1cblxuICByb3dSZW9yZGVyZWQgPSAoZXZlbnQ6IHtkcmFnSW5kZXg6IG51bWJlciwgZHJvcEluZGV4OiBudW1iZXJ9KSA9PiB7XG4gICAgaWYgKGV2ZW50LmRyb3BJbmRleCA+PSBldmVudC5kcmFnSW5kZXgpIHtcbiAgICAgIC8vIEJ1ZyBpbiBQcmltZU5nLCB3aGVuIGRyYWdnaW5nIHVwL1wib24gdG9wXCIgb2YgYW5vdGhlciByb3cgaXQgZ2V0cyB0aGUgd3JvbmcgaW5kZXhcbiAgICAgIGV2ZW50LmRyb3BJbmRleC0tO1xuICAgIH1cbiAgICBjb25zdCByZW9yZGVyYWJsZUNvbHVtbiA9IHRoaXMuX2NvbmZpZy5jb2x1bW5zLmZpbmQoY29sID0+IGNvbC5yZW9yZGVyYWJsZSA9PT0gdHJ1ZSk7XG4gICAgdGhpcy5fY29uZmlnLmRhdGFbZXZlbnQuZHJvcEluZGV4XVtyZW9yZGVyYWJsZUNvbHVtbi5uYW1lXSA9IGV2ZW50LmRyb3BJbmRleCArIDE7XG4gICAgaWYgKGV2ZW50LmRyb3BJbmRleCA+IGV2ZW50LmRyYWdJbmRleCkge1xuICAgICAgZm9yIChsZXQgaSA9IGV2ZW50LmRyYWdJbmRleDsgaSA8IGV2ZW50LmRyb3BJbmRleDsgaSsrKSB7XG4gICAgICAgIHRoaXMuX2NvbmZpZy5kYXRhW2ldW3Jlb3JkZXJhYmxlQ29sdW1uLm5hbWVdID0gaSArIDE7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAobGV0IGkgPSBldmVudC5kcm9wSW5kZXg7IGkgPD0gZXZlbnQuZHJhZ0luZGV4OyBpKyspIHtcbiAgICAgICAgdGhpcy5fY29uZmlnLmRhdGFbaV1bcmVvcmRlcmFibGVDb2x1bW4ubmFtZV0gPSBpICsgMTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB0b2dnbGVGaWx0ZXJzID0gKCkgPT4gdGhpcy5zaG93RmlsdGVycyA9ICF0aGlzLnNob3dGaWx0ZXJzO1xuXG4gIGdldENlbGxWYWx1ZShyb3c6IGFueSwgY29sOiBQcmltZVRhYmxlQ29sdW1uPGFueT4pIHtcbiAgICBpZiAoY29sLnJlbmRlcikge1xuICAgICAgcmV0dXJuIGNvbC5yZW5kZXIocm93KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMucmVzb2x2ZUtleShjb2wubmFtZSwgcm93KTtcbiAgICB9XG4gIH1cblxuICBnZXRMaW5rVmFsdWUocm93OiBhbnksIGNvbDogUHJpbWVUYWJsZUNvbHVtbjxhbnk+KSB7XG4gICAgY29uc3QgZHluYW1pY1BhdGggPSBjb2wud2l0aExpbmsuZHluYW1pYyA/ICcvJyArIHRoaXMucmVzb2x2ZUtleShjb2wud2l0aExpbmsuZHluYW1pYywgcm93KSA6ICcnO1xuICAgIHJldHVybiBjb2wud2l0aExpbmsuc3RhdGljUGF0aCArIGR5bmFtaWNQYXRoO1xuICB9XG5cbiAgcHJpdmF0ZSByZXNvbHZlS2V5ID0gKGtleTogc3RyaW5nLCBvYmo6IGFueSk6IHN0cmluZyA9PiB7XG4gICAgcmV0dXJuIGtleS5zcGxpdCgnLicpLnJlZHVjZSgocHJldjogYW55LCBjdXJyOiBhbnkpID0+IHByZXYgPyBwcmV2W2N1cnJdIDogbnVsbCAsIG9iaik7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBDb250ZXh0TWVudU1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvY29udGV4dG1lbnUnO1xuaW1wb3J0IHsgRHJvcGRvd25Nb2R1bGUgfSBmcm9tICdwcmltZW5nL2Ryb3Bkb3duJztcbmltcG9ydCB7IE11bHRpU2VsZWN0TW9kdWxlIH0gZnJvbSAncHJpbWVuZy9tdWx0aXNlbGVjdCc7XG5pbXBvcnQgeyBUYWJsZU1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvdGFibGUnO1xuaW1wb3J0IHsgVG9vbHRpcE1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvdG9vbHRpcCc7XG5pbXBvcnQgeyBUcmVlVGFibGVNb2R1bGUgfSBmcm9tICdwcmltZW5nL3RyZWV0YWJsZSc7XG5cbmltcG9ydCB7IFByaW1lVGFibGVDb21wb25lbnQgfSBmcm9tICcuL3ByaW1lLXRhYmxlLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBUYWJsZU1vZHVsZSxcbiAgICBUcmVlVGFibGVNb2R1bGUsXG4gICAgTXVsdGlTZWxlY3RNb2R1bGUsXG4gICAgRHJvcGRvd25Nb2R1bGUsXG4gICAgVG9vbHRpcE1vZHVsZSxcbiAgICBDb250ZXh0TWVudU1vZHVsZSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbUHJpbWVUYWJsZUNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtQcmltZVRhYmxlQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBQcmltZVRhYmxlTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgUHJpbWVUYWJsZUNvbHVtbkxpbmsgfSBmcm9tICcuL3ByaW1lLXRhYmxlLWNvbHVtbi1saW5rJztcblxuZXhwb3J0IGNsYXNzIFByaW1lVGFibGVDb2x1bW48VD4ge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgZGlzcGxheU5hbWU6IHN0cmluZyxcbiAgICAgICAgcHVibGljIG5hbWU6IHN0cmluZyxcbiAgICAgICAgcHVibGljIGVkaXRhYmxlID0gZmFsc2UsXG4gICAgICAgIHB1YmxpYyByZW9yZGVyYWJsZSA9IGZhbHNlLFxuICAgICAgICBwdWJsaWMgdmlzaWJsZSA9IHRydWUsXG4gICAgICAgIHB1YmxpYyByZW5kZXI/OiAocm93OiBUKSA9PiBhbnksXG4gICAgICAgIHB1YmxpYyBleHRyYUNsYXNzPzogKHJvdzogVCkgPT4gc3RyaW5nLFxuICAgICAgICBwdWJsaWMgdmFsdWVzPzogYW55W11cbiAgICApIHsgfVxuICAgIGhhc1NlbGVjdCA/ID0gZmFsc2U7XG4gICAgW2tleTogc3RyaW5nXTogYW55O1xuICAgIHdpdGhMaW5rOiBQcmltZVRhYmxlQ29sdW1uTGluayA9IG51bGw7XG59XG4iLCJleHBvcnQgY2xhc3MgUHJpbWVUYWJsZUNvbHVtbkxpbmsge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgc3RhdGljUGF0aDogc3RyaW5nLFxuICAgICAgICBwdWJsaWMgZHluYW1pYz86IHN0cmluZ1xuICAgICkgeyB9XG59XG4iLCJpbXBvcnQgeyBNZW51SXRlbSwgVHJlZU5vZGUgfSBmcm9tICdwcmltZW5nL2FwaSc7XG5cbmV4cG9ydCBjbGFzcyBQcmltZVRhYmxlQ29udGV4dE1lbnUge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgZW5hYmxlZDogYm9vbGVhbixcbiAgICAgICAgcHVibGljIG5vZGU6IFRyZWVOb2RlIHwgYW55LFxuICAgICAgICBwdWJsaWMgaXRlbXM6IE1lbnVJdGVtW11cbiAgICApIHsgfVxufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtJQU9FO0tBQWlCOztnQkFMbEIsVUFBVSxTQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7Ozs7NEJBSkQ7Ozs7Ozs7SUNLQTtJQUNJLDBCQUNJLE1BQW9EO3lCQWdDckMsS0FBSzt3QkFFTixJQUFJO3VCQUNMLElBQUk7c0JBQ0wsSUFBSTt3QkFDRixJQUFJOzBCQUNGLEtBQUs7eUJBQ04sS0FBSzswQkFDSixLQUFLOzZCQUNGLEtBQUs7MEJBQ1IsSUFBSTswQkFDSixJQUFJO3lCQUNHLElBQUk7b0JBQ0csSUFBSTs4QkFDZDtZQUNwQixTQUFTLEVBQUUsS0FBSztZQUNoQixVQUFVLEVBQUUsS0FBSztTQUNwQjt1QkFDd0IsSUFBSTtpQ0FDTSxJQUFJO29CQUNGO1lBQ2pDLE9BQU8sRUFBRSxLQUFLO1lBQ2QsSUFBSSxFQUFFLElBQUk7WUFDVixLQUFLLEVBQUUsRUFBRTtTQUNaO1FBdERHLFFBQVEsTUFBTTtZQUNWLEtBQUssTUFBTTtnQkFDUCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztnQkFDdEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO2dCQUMxQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztnQkFDcEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7Z0JBQ2pCLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO2dCQUM1QixNQUFNO1lBQ04sS0FBSyxXQUFXO2dCQUNaLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO2dCQUN0QixJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztnQkFDNUIsTUFBTTtZQUNOLEtBQUssUUFBUTtnQkFDVCxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztnQkFDdEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7Z0JBQ3BCLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztnQkFDdkMsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7Z0JBQzVCLE1BQU07WUFDTixLQUFLLFVBQVUsQ0FBQztZQUNoQjtnQkFDSSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztnQkFDdkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7Z0JBQ3RCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO2dCQUN2QixJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztnQkFDeEIsTUFBTTtTQUNUO0tBQ0o7Ozs7O0lBNkJNLCtDQUFvQjs7OztjQUFDLFlBQW9CO1FBQzVDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxZQUFZLENBQUM7Ozs7O0lBR25DLGdDQUFLOzs7O1FBQ1IsSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7UUFDZixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7Ozs7OztJQUduQixxQ0FBVTs7OztjQUFDLElBQTZCO1FBQzNDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLFlBQVMsR0FBRyxDQUFDLElBQUksR0FBQSxDQUFDLENBQUM7UUFDMUMsSUFBSSxDQUFDLE9BQU8sWUFBTyxJQUFJLENBQUMsQ0FBQzs7Ozs7O0lBRXRCLGtDQUFPOzs7O2NBQUMsSUFBVztRQUN0QixJQUFJLENBQUMsSUFBSSxZQUFPLElBQUksQ0FBQyxDQUFDOzs7Ozs7SUFFbkIsc0NBQVc7Ozs7Y0FBQyxJQUFXOztRQUMxQixJQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUNyRSxJQUFJLENBQUMsSUFBSSxZQUFPLFlBQVksQ0FBQyxDQUFDOzs7Ozs7SUFHM0Isa0NBQU87Ozs7Y0FBQyxVQUFvQjs7UUFDL0IsVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLEtBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLEdBQUEsQ0FBQyxDQUFDOzs7Ozs7SUFHdEMsaUNBQU07Ozs7Y0FBQyxVQUFvQjs7UUFDOUIsVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLEtBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLEdBQUEsQ0FBQyxDQUFDOzs7Ozs7O0lBR3BDLHVDQUFZOzs7OztjQUFDLElBQVcsRUFBRSxHQUFXOzs7UUFDekMsSUFBSSxXQUFXLEdBQWUsRUFBRSxDQUFDO1FBRWpDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBQSxJQUFJOztZQUNULElBQU0sUUFBUSxHQUFhLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDO1lBQzFDLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQy9ELFFBQVEsQ0FBQyxRQUFRLEdBQUcsS0FBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7YUFDekQ7WUFDRCxXQUFXLFlBQU8sV0FBVyxHQUFFLFFBQVEsRUFBQyxDQUFDO1NBQzVDLENBQUMsQ0FBQztRQUVILE9BQU8sV0FBVyxDQUFDOzsyQkF6RzNCO0lBMkdDOzs7Ozs7QUMzR0Q7SUFvRUU7UUFBQSxpQkFFQzt1QkExRGdCLElBQUksZ0JBQWdCLENBQUMsVUFBVSxDQUFDOzBCQUM3QixJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUM7MkJBQ2xDLEtBQUs7b0NBQ0ksS0FBSzt3QkFDMEI7WUFDM0QsT0FBTyxFQUFFO2dCQUNQLEVBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFDO2dCQUMzQixFQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBQztnQkFDdEIsRUFBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUM7Z0JBQ3hCLEVBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFDO2dCQUN4QixFQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBQztnQkFDeEIsRUFBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUM7YUFDM0I7WUFDRCxRQUFRLEVBQUUsSUFBSTtTQUNmOzRCQUlxQixLQUFLOzZCQUVILElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQzttQkEyQjNDLElBQUksWUFBWSxFQUFPO29CQUN0QixJQUFJLFlBQVksRUFBTzt1QkFDcEIsSUFBSSxZQUFZLEVBQU87NEJBbUM1QixVQUFDLEtBQTZDO1lBQzNELElBQUksS0FBSyxDQUFDLFNBQVMsSUFBSSxLQUFLLENBQUMsU0FBUyxFQUFFOztnQkFFdEMsS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFDO2FBQ25COztZQUNELElBQU0saUJBQWlCLEdBQUcsS0FBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxDQUFDLFdBQVcsS0FBSyxJQUFJLEdBQUEsQ0FBQyxDQUFDO1lBQ3JGLEtBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztZQUNqRixJQUFJLEtBQUssQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDLFNBQVMsRUFBRTtnQkFDckMsS0FBSyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsU0FBUyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsU0FBUyxFQUFFLENBQUMsRUFBRSxFQUFFO29CQUN0RCxLQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUN0RDthQUNGO2lCQUFNO2dCQUNMLEtBQUssSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFDLElBQUksS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUUsRUFBRTtvQkFDdkQsS0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDdEQ7YUFDRjtTQUNGOzZCQUVlLGNBQU0sT0FBQSxLQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsS0FBSSxDQUFDLFdBQVcsR0FBQTswQkFlckMsVUFBQyxHQUFXLEVBQUUsR0FBUTtZQUN6QyxPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQUMsSUFBUyxFQUFFLElBQVMsSUFBSyxPQUFBLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxHQUFBLEVBQUcsR0FBRyxDQUFDLENBQUM7U0FDeEY7UUE5REMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0tBQ2pCO0lBcENELHNCQUNJLHVDQUFNOzs7OztRQURWLFVBQ1csS0FBdUI7WUFDaEMsSUFBSSxLQUFLLEVBQUU7Z0JBQ1QsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7Z0JBQ3JCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztnQkFDcEIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO2dCQUNqQixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQzthQUNqRDtTQUNGOzs7T0FBQTtJQUVELHNCQUNJLHFDQUFJOzs7OztRQURSLFVBQ1MsSUFBd0I7WUFDL0IsSUFBSSxJQUFJLEVBQUU7Z0JBQ1IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO3NCQUNyRCxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDN0IsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO2FBQ2xCO1NBQ0Y7OztPQUFBO0lBRUQsc0JBQ0ksd0NBQU87Ozs7O1FBRFgsVUFDWSxPQUFnQztZQUMxQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNqQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDckI7OztPQUFBOzs7OztJQU9ELHNDQUFROzs7O0lBRFIsVUFDUyxLQUFNO1FBQ2IsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLE1BQU0sQ0FBQyxXQUFXLEdBQUcsR0FBRyxJQUFJLElBQUksQ0FBQztLQUN2RDs7OztJQU1ELHNDQUFROzs7SUFBUjtRQUFBLGlCQVdDO1FBVkMsSUFBSSxJQUFJLENBQUMsb0JBQW9CLEVBQUU7O1lBRTdCLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLFVBQUEsVUFBVTtnQkFDbEMsSUFBSSxVQUFVLEVBQUU7O29CQUNkLElBQU0sbUJBQWlCLEdBQUcsS0FBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxDQUFDLFdBQVcsS0FBSyxJQUFJLEdBQUEsQ0FBQyxDQUFDO29CQUNyRixLQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7b0JBQzlCLG1CQUFDLEtBQUksQ0FBQyxPQUFPLENBQUMsSUFBYSxHQUFFLElBQUksQ0FBQyxVQUFDLEtBQUssRUFBRSxLQUFLLElBQUssT0FBQSxLQUFLLENBQUMsbUJBQWlCLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLG1CQUFpQixDQUFDLElBQUksQ0FBQyxHQUFBLENBQUMsQ0FBQztpQkFDcEg7YUFDRixDQUFDLENBQUM7U0FDSjtLQUNGOzs7O0lBRU8sdUNBQVM7Ozs7UUFDZixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzs7Ozs7SUFHckIsMENBQVk7Ozs7UUFDbEIsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLENBQUMsT0FBTyxLQUFLLEtBQUssR0FBQSxDQUFDLENBQUM7UUFDakYsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsQ0FBQyxXQUFXLEtBQUssSUFBSSxHQUFBLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUMsTUFBTSxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBQSxDQUFDLENBQUM7UUFDekYsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Ozs7Ozs7SUF1QmhDLDBDQUFZOzs7OztJQUFaLFVBQWEsR0FBUSxFQUFFLEdBQTBCO1FBQy9DLElBQUksR0FBRyxDQUFDLE1BQU0sRUFBRTtZQUNkLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUN4QjthQUFNO1lBQ0wsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDdkM7S0FDRjs7Ozs7O0lBRUQsMENBQVk7Ozs7O0lBQVosVUFBYSxHQUFRLEVBQUUsR0FBMEI7O1FBQy9DLElBQU0sV0FBVyxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNqRyxPQUFPLEdBQUcsQ0FBQyxRQUFRLENBQUMsVUFBVSxHQUFHLFdBQVcsQ0FBQztLQUM5Qzs7Z0JBekhGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsZUFBZTtvQkFDekIsaXBOQUEyQztpQkFFNUM7Ozs7O3lCQXdCRSxLQUFLLFNBQUMsUUFBUTt1QkFVZCxLQUFLLFNBQUMsTUFBTTswQkFTWixLQUFLLFNBQUMsU0FBUztzQkFNZixNQUFNO3VCQUNOLE1BQU07MEJBQ04sTUFBTTsyQkFFTixZQUFZLFNBQUMsZUFBZSxFQUFFLENBQUMsUUFBUSxDQUFDOzs4QkEvRDNDOzs7Ozs7O0FDQUE7Ozs7Z0JBWUMsUUFBUSxTQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLFdBQVc7d0JBQ1gsbUJBQW1CO3dCQUNuQixXQUFXO3dCQUNYLGVBQWU7d0JBQ2YsaUJBQWlCO3dCQUNqQixjQUFjO3dCQUNkLGFBQWE7d0JBQ2IsaUJBQWlCO3FCQUNsQjtvQkFDRCxZQUFZLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQztvQkFDbkMsT0FBTyxFQUFFLENBQUMsbUJBQW1CLENBQUM7aUJBQy9COzsyQkExQkQ7Ozs7Ozs7Ozs7QUNFQTs7O0FBQUE7SUFDSSwwQkFDVyxhQUNBLE1BQ0EsVUFDQSxhQUNBLFNBQ0EsUUFDQSxZQUNBOzs7O1FBUEEsZ0JBQVcsR0FBWCxXQUFXO1FBQ1gsU0FBSSxHQUFKLElBQUk7UUFDSixhQUFRLEdBQVIsUUFBUTtRQUNSLGdCQUFXLEdBQVgsV0FBVztRQUNYLFlBQU8sR0FBUCxPQUFPO1FBQ1AsV0FBTSxHQUFOLE1BQU07UUFDTixlQUFVLEdBQVYsVUFBVTtRQUNWLFdBQU0sR0FBTixNQUFNO3lCQUVILEtBQUs7d0JBRWMsSUFBSTtLQUhoQzsyQkFaVDtJQWdCQzs7Ozs7O0FDaEJELElBQUE7SUFDSSw4QkFDVyxZQUNBO1FBREEsZUFBVSxHQUFWLFVBQVU7UUFDVixZQUFPLEdBQVAsT0FBTztLQUNiOytCQUpUO0lBS0M7Ozs7OztBQ0hELElBQUE7SUFDSSwrQkFDVyxTQUNBLE1BQ0E7UUFGQSxZQUFPLEdBQVAsT0FBTztRQUNQLFNBQUksR0FBSixJQUFJO1FBQ0osVUFBSyxHQUFMLEtBQUs7S0FDWDtnQ0FQVDtJQVFDOzs7Ozs7Ozs7Ozs7OzsifQ==