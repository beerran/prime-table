(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('@angular/common'), require('@angular/forms'), require('primeng/contextmenu'), require('primeng/dropdown'), require('primeng/multiselect'), require('primeng/table'), require('primeng/tooltip'), require('primeng/treetable')) :
    typeof define === 'function' && define.amd ? define('prime-table', ['exports', '@angular/core', 'rxjs', '@angular/common', '@angular/forms', 'primeng/contextmenu', 'primeng/dropdown', 'primeng/multiselect', 'primeng/table', 'primeng/tooltip', 'primeng/treetable'], factory) :
    (factory((global['prime-table'] = {}),global.ng.core,global.rxjs,global.ng.common,global.ng.forms,global.contextmenu,global.dropdown,global.multiselect,global.table,global.tooltip,global.treetable));
}(this, (function (exports,i0,rxjs,common,forms,contextmenu,dropdown,multiselect,table,tooltip,treetable) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var PrimeTableService = /** @class */ (function () {
        function PrimeTableService() {
        }
        PrimeTableService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        PrimeTableService.ctorParameters = function () { return []; };
        /** @nocollapse */ PrimeTableService.ngInjectableDef = i0.defineInjectable({ factory: function PrimeTableService_Factory() { return new PrimeTableService(); }, token: PrimeTableService, providedIn: "root" });
        return PrimeTableService;
    }());

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

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
            this.dataLoaded = new rxjs.BehaviorSubject(false);
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
            this.columnsLoaded = new rxjs.BehaviorSubject(false);
            this.add = new i0.EventEmitter();
            this.edit = new i0.EventEmitter();
            this.archive = new i0.EventEmitter();
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
             */ function (input) {
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
             */ function (data) {
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
             */ function (columns) {
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
                            ( /** @type {?} */(_this._config.data)).sort(function (item1, item2) { return item1[reorderableColumn_1.name] - item2[reorderableColumn_1.name]; });
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
            { type: i0.Component, args: [{
                        selector: 'b-prime-table',
                        template: "<p-contextMenu #cm appendTo=\"body\" [model]=\"_config.menu.items\"></p-contextMenu>\n\n\n<p-treeTable *ngIf=\"_config.drilldown\" [value]=\"_config.data\" [(contextMenuSelection)]=\"_config.menu.node\" [contextMenu]=\"cm\" [columns]=\"selectedColumns\" class=\"table\" [class.table-sm]=\"_config.size === 'sm'\">\n    <ng-template pTemplate=\"header\" let-columns>\n        <tr>\n            <th *ngFor=\"let col of columns\">{{col.displayName || col.name}}</th>\n        </tr>\n    </ng-template>\n    <ng-template pTemplate=\"body\" let-rowNode let-rowData=\"rowData\" let-columns=\"columns\">\n        <tr [ttContextMenuRow]=\"rowNode\" tooltipPosition=\"top\" [pTooltip]=\"_config.tooltip ? rowData[_config.tooltip] : null\">\n            <td *ngFor=\"let col of columns; let i = index\" [ngClass]=\"col.extraClass ? col.extraClass(rowData) : ''\">\n                <p-treeTableToggler [rowNode]=\"rowNode\" *ngIf=\"i === 0\"></p-treeTableToggler>\n                <span>{{rowData[col.name]}}</span>\n            </td>\n        </tr>\n    </ng-template>\n</p-treeTable>\n<p-table [responsive]=\"_config.responsive\" [autoLayout]=\"_config.autoLayout\" (onRowReorder)=\"rowReordered($event)\" *ngIf=\"!_config.drilldown\" #dt [(contextMenuSelection)]=\"_config.menu.node\" [contextMenu]=\"cm\" [resizableColumns]=\"_config.columnSettings.resizable\"\n    selectionMode=\"multiple\" [(selection)]=\"selectedRows\" [scrollHeight]=\"screenHeight\" [paginator]=\"rowCount.selected ? _config.data.length > rowCount.selected : false\" [rows]=\"rowCount.selected\" class=\"table\" [class.table-sm]=\"_config.size === 'sm'\" [value]=\"_config.data\"\n    [columns]=\"selectedColumns\">\n    <ng-template pTemplate=\"caption\">\n        <div class=\"row\">\n            <div class=\"col-6 col-md-2\" *ngIf=\"_config.rowCount\">\n                <p-dropdown class=\"pull-left\" [options]=\"rowCount.options\" [(ngModel)]=\"rowCount.selected\"></p-dropdown>\n            </div>\n            <div class=\"col-6 col-md-3\" *ngIf=\"_config.columnSettings.selectable\" [class.col-md-5]=\"!_config.rowCount\">\n                <p-multiSelect [options]=\"_config.columns\" [(ngModel)]=\"selectedColumns\" optionLabel=\"displayName\" selectedItemsLabel=\"{0} columns selected\" [style]=\"{minWidth: '200px'}\" defaultLabel=\"Choose Columns\"></p-multiSelect>\n            </div>\n            <div class=\"col-12 col-md-7\" [class.col-md-10]=\"!_config.columnSettings.selectable\" [class.col-md-12]=\"!_config.rowCount && !_config.columnSettings.selectable\">\n                <button *ngIf=\"_config.filters\" class=\"btn btn-sm btn-dark d-inline\" type=\"button\" (click)=\"toggleFilters()\">Filters</button>\n                <button *ngIf=\"_config.export\" class=\"btn btn-sm btn-dark mx-2 d-inline\" type=\"button\" pButton iconPos=\"left\" label=\"All Data\" (click)=\"dt.exportCSV()\">Export</button>\n                <button *ngIf=\"_config.addButton\" class=\"btn btn-sm btn-success ml-2 pull-right\" type=\"button\" (click)=\"add.emit(true)\">Add new</button>\n                <ng-content select=\".table-extra-content\"></ng-content>\n            </div>\n        </div>\n        <div class=\"row\" *ngIf=\"showFilters\">\n            <div class=\"col\">\n                <input type=\"text\" style=\"width:auto\" class=\"form-control form-control-sm d-inline\" pInputText size=\"50\" placeholder=\"Global Filter\" (input)=\"dt.filterGlobal($event.target.value, 'contains')\">\n            </div>\n        </div>\n    </ng-template>\n    <ng-template pTemplate=\"header\" let-columns>\n        <tr *ngIf=\"_config.sortable; else unsortableRow\">\n            <th *ngIf=\"hasReorderableColumn\" style=\"width:3rem\"></th>\n            <th [pSortableColumn]=\"col.name\" *ngFor=\"let col of columns\" pResizableColumn>\n                {{col.displayName || col.name}}\n                <p-sortIcon [field]=\"col.name\"></p-sortIcon>\n            </th>\n            <th *ngIf=\"_config.editButton\">Edit</th>\n            <th *ngIf=\"_config.archiveButton\">Archive</th>\n        </tr>\n        <ng-template #unsortableRow>\n            <tr>\n                <th *ngIf=\"hasReorderableColumn\" style=\"width:3rem\"></th>\n                <th *ngFor=\"let col of columns\" pResizableColumn>\n                    {{col.displayName || col.name}}\n                </th>\n                <th *ngIf=\"_config.editButton\">Edit</th>\n                <th *ngIf=\"_config.archiveButton\">Archive</th>\n            </tr>\n        </ng-template>\n    </ng-template>\n\n    <ng-template pTemplate=\"body\" let-row let-columns=\"columns\" let-index=\"rowIndex\">\n        <tr [pContextMenuRow]=\"row\" [pSelectableRow]=\"row\" [pReorderableRow]=\"index\" (onDrop)=\"rowReordered($event)\">\n            <td *ngIf=\"hasReorderableColumn\">\n                <i class=\"fa fa-bars move\" pReorderableRowHandle></i>\n            </td>\n            <td *ngFor=\"let col of columns\" [class.with-select]=\"col.hasSelect\" pEditableColumn class=\"ui-resizable-column\" [ngClass]=\"col.extraClass ? col.extraClass(row) : ''\">\n                <p-cellEditor *ngIf=\"col.editable; else onlyOutput\">\n                    <ng-template pTemplate=\"input\">\n                        <input type=\"text\" class=\"form-control form-control-sm\" [(ngModel)]=\"row[col.field]\" />\n                    </ng-template>\n                    <ng-template pTemplate=\"output\">\n                        <span>{{getCellValue(row, col)}}</span>\n                    </ng-template>\n                </p-cellEditor>\n                <ng-template #onlyOutput>\n                    <div *ngIf=\"col.hasSelect; else textInput\">\n                        <p-dropdown class=\"w-auto mw-100\" [options]=\"col.values\" placeholder=\"Select\" optionLabel=\"name\" [filter]=\"true\" filterBy=\"value.name\" [(ngModel)]=\"row[col.name]\">\n                        </p-dropdown>\n                    </div>\n                    <ng-template #textInput>\n                        <a *ngIf=\"col.withLink; else spanOnly\" routerLink=\"/{{getLinkValue(row, col)}}\">{{getCellValue(row, col)}}</a>\n                        <ng-template #spanOnly><span>{{getCellValue(row, col)}}</span></ng-template>\n                    </ng-template>\n                </ng-template>\n            </td>\n            <td *ngIf=\"_config.editButton\"><button class=\"btn btn-xs btn-dark\" (click)=\"edit.emit(row)\">Edit</button></td>\n            <td *ngIf=\"_config.archiveButton\"><button class=\"btn btn-xs\" [ngClass]=\"row.archived ? 'btn-dark' : 'btn-danger'\" (click)=\"archive.emit(row)\">{{row.archived ? 'Restore' : 'Archive'}}</button></td>\n        </tr>\n    </ng-template>\n</p-table>\n\n<div *ngIf=\"(dataLoaded | async) === false\">Loading data...</div>"
                    }] }
        ];
        /** @nocollapse */
        PrimeTableComponent.ctorParameters = function () { return []; };
        PrimeTableComponent.propDecorators = {
            config: [{ type: i0.Input, args: ['config',] }],
            data: [{ type: i0.Input, args: ['data',] }],
            columns: [{ type: i0.Input, args: ['columns',] }],
            add: [{ type: i0.Output }],
            edit: [{ type: i0.Output }],
            archive: [{ type: i0.Output }],
            onResize: [{ type: i0.HostListener, args: ['window:resize', ['$event'],] }]
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
            { type: i0.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            forms.FormsModule,
                            forms.ReactiveFormsModule,
                            table.TableModule,
                            treetable.TreeTableModule,
                            multiselect.MultiSelectModule,
                            dropdown.DropdownModule,
                            tooltip.TooltipModule,
                            contextmenu.ContextMenuModule,
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
    var /**
     * @template T
     */ PrimeTableColumn = /** @class */ (function () {
        function PrimeTableColumn(displayName, name, editable, reorderable, visible, render, extraClass, values) {
            if (editable === void 0) {
                editable = false;
            }
            if (reorderable === void 0) {
                reorderable = false;
            }
            if (visible === void 0) {
                visible = true;
            }
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

    exports.PrimeTableService = PrimeTableService;
    exports.PrimeTableComponent = PrimeTableComponent;
    exports.PrimeTableModule = PrimeTableModule;
    exports.PrimeTableColumn = PrimeTableColumn;
    exports.PrimeTableColumnLink = PrimeTableColumnLink;
    exports.PrimeTableConfig = PrimeTableConfig;
    exports.PrimeTableContextMenu = PrimeTableContextMenu;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpbWUtdGFibGUudW1kLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9wcmltZS10YWJsZS9saWIvcHJpbWUtdGFibGUuc2VydmljZS50cyIsIm5vZGVfbW9kdWxlcy90c2xpYi90c2xpYi5lczYuanMiLCJuZzovL3ByaW1lLXRhYmxlL2xpYi9tb2RlbHMvcHJpbWUtdGFibGUtY29uZmlnLnRzIiwibmc6Ly9wcmltZS10YWJsZS9saWIvcHJpbWUtdGFibGUuY29tcG9uZW50LnRzIiwibmc6Ly9wcmltZS10YWJsZS9saWIvcHJpbWUtdGFibGUubW9kdWxlLnRzIiwibmc6Ly9wcmltZS10YWJsZS9saWIvbW9kZWxzL3ByaW1lLXRhYmxlLWNvbHVtbi50cyIsIm5nOi8vcHJpbWUtdGFibGUvbGliL21vZGVscy9wcmltZS10YWJsZS1jb2x1bW4tbGluay50cyIsIm5nOi8vcHJpbWUtdGFibGUvbGliL21vZGVscy9wcmltZS10YWJsZS1jb250ZXh0LW1lbnUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBQcmltZVRhYmxlU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cbn1cbiIsIi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXHJcbnRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXHJcbkxpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcblxyXG5USElTIENPREUgSVMgUFJPVklERUQgT04gQU4gKkFTIElTKiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZXHJcbktJTkQsIEVJVEhFUiBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBXSVRIT1VUIExJTUlUQVRJT04gQU5ZIElNUExJRURcclxuV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIFRJVExFLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSxcclxuTUVSQ0hBTlRBQkxJVFkgT1IgTk9OLUlORlJJTkdFTUVOVC5cclxuXHJcblNlZSB0aGUgQXBhY2hlIFZlcnNpb24gMi4wIExpY2Vuc2UgZm9yIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9uc1xyXG5hbmQgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XHJcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH1cclxuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMClcclxuICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBleHBvcnRzKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmICghZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShwKSkgZXhwb3J0c1twXSA9IG1bcF07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl0sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlmIChnW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xyXG4gICAgdmFyIGksIHA7XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlbbl0gPSBvW25dID8gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogbiA9PT0gXCJyZXR1cm5cIiB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgcmV0dXJuIGNvb2tlZDtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kKSB7XHJcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xyXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIHJlc3VsdFtrXSA9IG1vZFtrXTtcclxuICAgIHJlc3VsdC5kZWZhdWx0ID0gbW9kO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0RGVmYXVsdChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgZGVmYXVsdDogbW9kIH07XHJcbn1cclxuIiwiaW1wb3J0IHsgVHJlZU5vZGUgfSBmcm9tICdwcmltZW5nL2FwaSc7XG5cbmltcG9ydCB7IFByaW1lVGFibGVDb2x1bW4gfSBmcm9tICcuL3ByaW1lLXRhYmxlLWNvbHVtbic7XG5pbXBvcnQgeyBQcmltZVRhYmxlQ29udGV4dE1lbnUgfSBmcm9tICcuL3ByaW1lLXRhYmxlLWNvbnRleHQtbWVudSc7XG5cbmV4cG9ydCBjbGFzcyBQcmltZVRhYmxlQ29uZmlnIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJlc2V0OiAnZWFzeScgfCAnc3RhbmRhcmQnIHwgJ2RyaWxsZG93bicgfCAnZm9ybWF0J1xuICAgICkge1xuICAgICAgICBzd2l0Y2ggKHByZXNldCkge1xuICAgICAgICAgICAgY2FzZSAnZWFzeSc6XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRCdXR0b24gPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuZWRpdEJ1dHRvbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5hcmNoaXZlQnV0dG9uID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmV4cG9ydCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuc2l6ZSA9ICdzbSc7XG4gICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxhYmxlID0gZmFsc2U7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2RyaWxsZG93bic6XG4gICAgICAgICAgICAgICAgdGhpcy5kcmlsbGRvd24gPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsYWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdmb3JtYXQnOlxuICAgICAgICAgICAgICAgIHRoaXMucm93Q291bnQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLmV4cG9ydCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuY29sdW1uU2V0dGluZ3Muc2VsZWN0YWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuYXV0b0xheW91dCA9IGZhbHNlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdzdGFuZGFyZCc6XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRoaXMuZWRpdEJ1dHRvbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRCdXR0b24gPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsYWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5yb3dzU2hvd24gPSAxMDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIHB1YmxpYyBkYXRhOiBhbnlbXSB8IFRyZWVOb2RlW107XG4gICAgcHVibGljIGNvbHVtbnM6IFByaW1lVGFibGVDb2x1bW48YW55PltdO1xuICAgIHB1YmxpYyBkcmlsbGRvd24gPSBmYWxzZTtcblxuICAgIHB1YmxpYyByb3dDb3VudCA9IHRydWU7XG4gICAgcHVibGljIGZpbHRlcnMgPSB0cnVlO1xuICAgIHB1YmxpYyBleHBvcnQgPSB0cnVlO1xuICAgIHB1YmxpYyBzb3J0YWJsZSA9IHRydWU7XG4gICAgcHVibGljIHNjcm9sbGFibGUgPSBmYWxzZTtcbiAgICBwdWJsaWMgYWRkQnV0dG9uID0gZmFsc2U7XG4gICAgcHVibGljIGVkaXRCdXR0b24gPSBmYWxzZTtcbiAgICBwdWJsaWMgYXJjaGl2ZUJ1dHRvbiA9IGZhbHNlO1xuICAgIHB1YmxpYyByZXNwb25zaXZlID0gdHJ1ZTtcbiAgICBwdWJsaWMgYXV0b0xheW91dCA9IHRydWU7XG4gICAgcHVibGljIHJvd3NTaG93bjogbnVtYmVyID0gbnVsbDtcbiAgICBwdWJsaWMgc2l6ZTogJ3NtJyB8ICdtZCcgfCAnbGcnID0gJ21kJztcbiAgICBwdWJsaWMgY29sdW1uU2V0dGluZ3MgPSB7XG4gICAgICAgIHJlc2l6YWJsZTogZmFsc2UsXG4gICAgICAgIHNlbGVjdGFibGU6IGZhbHNlXG4gICAgfTtcbiAgICBwdWJsaWMgdG9vbHRpcDogc3RyaW5nID0gbnVsbDtcbiAgICBwdWJsaWMgZHJpbGxkb3duUHJvcGVydHk6IHN0cmluZyA9IG51bGw7XG4gICAgcHVibGljIG1lbnU6IFByaW1lVGFibGVDb250ZXh0TWVudSA9IHtcbiAgICAgICAgZW5hYmxlZDogZmFsc2UsXG4gICAgICAgIG5vZGU6IG51bGwsXG4gICAgICAgIGl0ZW1zOiBbXVxuICAgIH07XG5cbiAgICBwdWJsaWMgc2V0RHJpbGxkb3duUHJvcGVydHkocHJvcGVydHlOYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5kcmlsbGRvd25Qcm9wZXJ0eSA9IHByb3BlcnR5TmFtZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY2xlYXIoKSB7XG4gICAgICAgIHRoaXMuZGF0YSA9IFtdO1xuICAgICAgICB0aGlzLm1lbnUubm9kZSA9IG51bGw7XG4gICAgfVxuXG4gICAgcHVibGljIHNldENvbHVtbnMoY29sczogUHJpbWVUYWJsZUNvbHVtbjxhbnk+W10pIHtcbiAgICAgICAgY29scy5mb3JFYWNoKGNvbCA9PiBjb2wuZmllbGQgPSBjb2wubmFtZSk7XG4gICAgICAgIHRoaXMuY29sdW1ucyA9IFsuLi5jb2xzXTtcbiAgICB9XG4gICAgcHVibGljIHNldERhdGEoZGF0YTogYW55W10pIHtcbiAgICAgICAgdGhpcy5kYXRhID0gWy4uLmRhdGFdO1xuICAgIH1cbiAgICBwdWJsaWMgc2V0VHJlZURhdGEoZGF0YTogYW55W10pIHtcbiAgICAgICAgY29uc3QgdHJlZU5vZGVEYXRhID0gdGhpcy5nZXRUcmVlTm9kZXMoZGF0YSwgdGhpcy5kcmlsbGRvd25Qcm9wZXJ0eSk7XG4gICAgICAgIHRoaXMuZGF0YSA9IFsuLi50cmVlTm9kZURhdGFdO1xuICAgIH1cblxuICAgIHB1YmxpYyBkaXNhYmxlKHByb3BlcnRpZXM6IHN0cmluZ1tdKSB7XG4gICAgICAgIHByb3BlcnRpZXMuZm9yRWFjaChwID0+IHRoaXNbcF0gPSBmYWxzZSk7XG4gICAgfVxuXG4gICAgcHVibGljIGVuYWJsZShwcm9wZXJ0aWVzOiBzdHJpbmdbXSkge1xuICAgICAgICBwcm9wZXJ0aWVzLmZvckVhY2gocCA9PiB0aGlzW3BdID0gdHJ1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRUcmVlTm9kZXMoZGF0YTogYW55W10sIGtleTogc3RyaW5nKTogVHJlZU5vZGVbXSB7XG4gICAgICAgIGxldCB0cmFuc2Zvcm1lZDogVHJlZU5vZGVbXSA9IFtdO1xuXG4gICAgICAgIGRhdGEubWFwKGl0ZW0gPT4ge1xuICAgICAgICAgICAgY29uc3QgdHJlZU5vZGU6IFRyZWVOb2RlID0geyBkYXRhOiBpdGVtIH07XG4gICAgICAgICAgICBpZiAoaXRlbS5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIGl0ZW1ba2V5XSAmJiBpdGVtW2tleV0ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHRyZWVOb2RlLmNoaWxkcmVuID0gdGhpcy5nZXRUcmVlTm9kZXMoaXRlbVtrZXldLCBrZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdHJhbnNmb3JtZWQgPSBbLi4udHJhbnNmb3JtZWQsIHRyZWVOb2RlXTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHRyYW5zZm9ybWVkO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPbkluaXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU2VsZWN0SXRlbSwgVHJlZU5vZGUgfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFByaW1lVGFibGVDb25maWcgfSBmcm9tICcuL21vZGVscy9wcmltZS10YWJsZS1jb25maWcnO1xuaW1wb3J0IHsgUHJpbWVUYWJsZUNvbHVtbiB9IGZyb20gJy4vbW9kZWxzL3ByaW1lLXRhYmxlLWNvbHVtbic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2ItcHJpbWUtdGFibGUnLFxuICB0ZW1wbGF0ZVVybDogJy4vcHJpbWUtdGFibGUuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZXM6IFtdXG59KVxuZXhwb3J0IGNsYXNzIFByaW1lVGFibGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBwdWJsaWMgX2NvbmZpZyA9IG5ldyBQcmltZVRhYmxlQ29uZmlnKCdzdGFuZGFyZCcpO1xuICBwdWJsaWMgZGF0YUxvYWRlZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBwdWJsaWMgc2hvd0ZpbHRlcnMgPSBmYWxzZTtcbiAgcHVibGljIGhhc1Jlb3JkZXJhYmxlQ29sdW1uID0gZmFsc2U7XG4gIHB1YmxpYyByb3dDb3VudDoge29wdGlvbnM6IFNlbGVjdEl0ZW1bXSwgc2VsZWN0ZWQ6IG51bWJlcn0gPSB7XG4gICAgb3B0aW9uczogW1xuICAgICAge2xhYmVsOiAnQWxsJywgdmFsdWU6IG51bGx9LFxuICAgICAge2xhYmVsOiAnNScsIHZhbHVlOiA1fSxcbiAgICAgIHtsYWJlbDogJzEwJywgdmFsdWU6IDEwfSxcbiAgICAgIHtsYWJlbDogJzI1JywgdmFsdWU6IDI1fSxcbiAgICAgIHtsYWJlbDogJzUwJywgdmFsdWU6IDUwfSxcbiAgICAgIHtsYWJlbDogJzEwMCcsIHZhbHVlOiAxMDB9XG4gICAgXSxcbiAgICBzZWxlY3RlZDogbnVsbFxuICB9O1xuICBwdWJsaWMgc2VsZWN0ZWRDb2x1bW5zOiBhbnlbXTtcbiAgcHVibGljIHNlbGVjdGVkUm93czogYW55W107XG5cbiAgcHVibGljIHNjcmVlbkhlaWdodCA9ICcwcHgnO1xuXG4gIHByaXZhdGUgY29sdW1uc0xvYWRlZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuXG4gIEBJbnB1dCgnY29uZmlnJylcbiAgc2V0IGNvbmZpZyhpbnB1dDogUHJpbWVUYWJsZUNvbmZpZykge1xuICAgIGlmIChpbnB1dCkge1xuICAgICAgdGhpcy5fY29uZmlnID0gaW5wdXQ7XG4gICAgICB0aGlzLnNldHVwQ29sdW1ucygpO1xuICAgICAgdGhpcy5zZXR1cERhdGEoKTtcbiAgICAgIHRoaXMucm93Q291bnQuc2VsZWN0ZWQgPSB0aGlzLl9jb25maWcucm93c1Nob3duO1xuICAgIH1cbiAgfVxuXG4gIEBJbnB1dCgnZGF0YScpXG4gIHNldCBkYXRhKGRhdGE6IGFueVtdIHwgVHJlZU5vZGVbXSkge1xuICAgIGlmIChkYXRhKSB7XG4gICAgICB0aGlzLl9jb25maWcuZHJpbGxkb3duID8gdGhpcy5fY29uZmlnLnNldFRyZWVEYXRhKGRhdGEpXG4gICAgICA6IHRoaXMuX2NvbmZpZy5zZXREYXRhKGRhdGEpO1xuICAgICAgdGhpcy5zZXR1cERhdGEoKTtcbiAgICB9XG4gIH1cblxuICBASW5wdXQoJ2NvbHVtbnMnKVxuICBzZXQgY29sdW1ucyhjb2x1bW5zOiBQcmltZVRhYmxlQ29sdW1uPGFueT5bXSkge1xuICAgIHRoaXMuX2NvbmZpZy5zZXRDb2x1bW5zKGNvbHVtbnMpO1xuICAgIHRoaXMuc2V0dXBDb2x1bW5zKCk7XG4gIH1cblxuICBAT3V0cHV0KCkgYWRkID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSBlZGl0ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSBhcmNoaXZlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQEhvc3RMaXN0ZW5lcignd2luZG93OnJlc2l6ZScsIFsnJGV2ZW50J10pXG4gIG9uUmVzaXplKGV2ZW50Pykge1xuICAgIHRoaXMuc2NyZWVuSGVpZ2h0ID0gKHdpbmRvdy5pbm5lckhlaWdodCAtIDM1MCkgKyAncHgnO1xuICB9XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5vblJlc2l6ZSgpO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKHRoaXMuaGFzUmVvcmRlcmFibGVDb2x1bW4pIHtcbiAgICAgIC8vIFRvRG86IEZpeCBmb3IgZHJpbGxkb3duIHRhYmxlc1xuICAgICAgdGhpcy5kYXRhTG9hZGVkLnN1YnNjcmliZShkYXRhTG9hZGVkID0+IHtcbiAgICAgICAgaWYgKGRhdGFMb2FkZWQpIHtcbiAgICAgICAgICBjb25zdCByZW9yZGVyYWJsZUNvbHVtbiA9IHRoaXMuX2NvbmZpZy5jb2x1bW5zLmZpbmQoY29sID0+IGNvbC5yZW9yZGVyYWJsZSA9PT0gdHJ1ZSk7XG4gICAgICAgICAgdGhpcy5fY29uZmlnLnNvcnRhYmxlID0gZmFsc2U7XG4gICAgICAgICAgKHRoaXMuX2NvbmZpZy5kYXRhIGFzIGFueVtdKS5zb3J0KChpdGVtMSwgaXRlbTIpID0+IGl0ZW0xW3Jlb3JkZXJhYmxlQ29sdW1uLm5hbWVdIC0gaXRlbTJbcmVvcmRlcmFibGVDb2x1bW4ubmFtZV0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNldHVwRGF0YSgpIHtcbiAgICB0aGlzLmRhdGFMb2FkZWQubmV4dCh0cnVlKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0dXBDb2x1bW5zKCkge1xuICAgIHRoaXMuc2VsZWN0ZWRDb2x1bW5zID0gdGhpcy5fY29uZmlnLmNvbHVtbnMuZmlsdGVyKGNvbCA9PiBjb2wudmlzaWJsZSAhPT0gZmFsc2UpO1xuICAgIHRoaXMuaGFzUmVvcmRlcmFibGVDb2x1bW4gPSB0aGlzLl9jb25maWcuY29sdW1ucy5maW5kSW5kZXgoY29sID0+IGNvbC5yZW9yZGVyYWJsZSA9PT0gdHJ1ZSkgPj0gMDtcbiAgICB0aGlzLl9jb25maWcuY29sdW1ucy5mb3JFYWNoKGNvbCA9PiBjb2wuaGFzU2VsZWN0ID0gY29sLnZhbHVlcyAmJiBjb2wudmFsdWVzLmxlbmd0aCA+IDEpO1xuICAgIHRoaXMuY29sdW1uc0xvYWRlZC5uZXh0KHRydWUpO1xuICB9XG5cbiAgcm93UmVvcmRlcmVkID0gKGV2ZW50OiB7ZHJhZ0luZGV4OiBudW1iZXIsIGRyb3BJbmRleDogbnVtYmVyfSkgPT4ge1xuICAgIGlmIChldmVudC5kcm9wSW5kZXggPj0gZXZlbnQuZHJhZ0luZGV4KSB7XG4gICAgICAvLyBCdWcgaW4gUHJpbWVOZywgd2hlbiBkcmFnZ2luZyB1cC9cIm9uIHRvcFwiIG9mIGFub3RoZXIgcm93IGl0IGdldHMgdGhlIHdyb25nIGluZGV4XG4gICAgICBldmVudC5kcm9wSW5kZXgtLTtcbiAgICB9XG4gICAgY29uc3QgcmVvcmRlcmFibGVDb2x1bW4gPSB0aGlzLl9jb25maWcuY29sdW1ucy5maW5kKGNvbCA9PiBjb2wucmVvcmRlcmFibGUgPT09IHRydWUpO1xuICAgIHRoaXMuX2NvbmZpZy5kYXRhW2V2ZW50LmRyb3BJbmRleF1bcmVvcmRlcmFibGVDb2x1bW4ubmFtZV0gPSBldmVudC5kcm9wSW5kZXggKyAxO1xuICAgIGlmIChldmVudC5kcm9wSW5kZXggPiBldmVudC5kcmFnSW5kZXgpIHtcbiAgICAgIGZvciAobGV0IGkgPSBldmVudC5kcmFnSW5kZXg7IGkgPCBldmVudC5kcm9wSW5kZXg7IGkrKykge1xuICAgICAgICB0aGlzLl9jb25maWcuZGF0YVtpXVtyZW9yZGVyYWJsZUNvbHVtbi5uYW1lXSA9IGkgKyAxO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGxldCBpID0gZXZlbnQuZHJvcEluZGV4OyBpIDw9IGV2ZW50LmRyYWdJbmRleDsgaSsrKSB7XG4gICAgICAgIHRoaXMuX2NvbmZpZy5kYXRhW2ldW3Jlb3JkZXJhYmxlQ29sdW1uLm5hbWVdID0gaSArIDE7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdG9nZ2xlRmlsdGVycyA9ICgpID0+IHRoaXMuc2hvd0ZpbHRlcnMgPSAhdGhpcy5zaG93RmlsdGVycztcblxuICBnZXRDZWxsVmFsdWUocm93OiBhbnksIGNvbDogUHJpbWVUYWJsZUNvbHVtbjxhbnk+KSB7XG4gICAgaWYgKGNvbC5yZW5kZXIpIHtcbiAgICAgIHJldHVybiBjb2wucmVuZGVyKHJvdyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnJlc29sdmVLZXkoY29sLm5hbWUsIHJvdyk7XG4gICAgfVxuICB9XG5cbiAgZ2V0TGlua1ZhbHVlKHJvdzogYW55LCBjb2w6IFByaW1lVGFibGVDb2x1bW48YW55Pikge1xuICAgIGNvbnN0IGR5bmFtaWNQYXRoID0gY29sLndpdGhMaW5rLmR5bmFtaWMgPyAnLycgKyB0aGlzLnJlc29sdmVLZXkoY29sLndpdGhMaW5rLmR5bmFtaWMsIHJvdykgOiAnJztcbiAgICByZXR1cm4gY29sLndpdGhMaW5rLnN0YXRpY1BhdGggKyBkeW5hbWljUGF0aDtcbiAgfVxuXG4gIHByaXZhdGUgcmVzb2x2ZUtleSA9IChrZXk6IHN0cmluZywgb2JqOiBhbnkpOiBzdHJpbmcgPT4ge1xuICAgIHJldHVybiBrZXkuc3BsaXQoJy4nKS5yZWR1Y2UoKHByZXY6IGFueSwgY3VycjogYW55KSA9PiBwcmV2ID8gcHJldltjdXJyXSA6IG51bGwgLCBvYmopO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQ29udGV4dE1lbnVNb2R1bGUgfSBmcm9tICdwcmltZW5nL2NvbnRleHRtZW51JztcbmltcG9ydCB7IERyb3Bkb3duTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9kcm9wZG93bic7XG5pbXBvcnQgeyBNdWx0aVNlbGVjdE1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvbXVsdGlzZWxlY3QnO1xuaW1wb3J0IHsgVGFibGVNb2R1bGUgfSBmcm9tICdwcmltZW5nL3RhYmxlJztcbmltcG9ydCB7IFRvb2x0aXBNb2R1bGUgfSBmcm9tICdwcmltZW5nL3Rvb2x0aXAnO1xuaW1wb3J0IHsgVHJlZVRhYmxlTW9kdWxlIH0gZnJvbSAncHJpbWVuZy90cmVldGFibGUnO1xuXG5pbXBvcnQgeyBQcmltZVRhYmxlQ29tcG9uZW50IH0gZnJvbSAnLi9wcmltZS10YWJsZS5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgVGFibGVNb2R1bGUsXG4gICAgVHJlZVRhYmxlTW9kdWxlLFxuICAgIE11bHRpU2VsZWN0TW9kdWxlLFxuICAgIERyb3Bkb3duTW9kdWxlLFxuICAgIFRvb2x0aXBNb2R1bGUsXG4gICAgQ29udGV4dE1lbnVNb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1ByaW1lVGFibGVDb21wb25lbnRdLFxuICBleHBvcnRzOiBbUHJpbWVUYWJsZUNvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgUHJpbWVUYWJsZU1vZHVsZSB7IH1cbiIsImltcG9ydCB7IFByaW1lVGFibGVDb2x1bW5MaW5rIH0gZnJvbSAnLi9wcmltZS10YWJsZS1jb2x1bW4tbGluayc7XG5cbmV4cG9ydCBjbGFzcyBQcmltZVRhYmxlQ29sdW1uPFQ+IHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGRpc3BsYXlOYW1lOiBzdHJpbmcsXG4gICAgICAgIHB1YmxpYyBuYW1lOiBzdHJpbmcsXG4gICAgICAgIHB1YmxpYyBlZGl0YWJsZSA9IGZhbHNlLFxuICAgICAgICBwdWJsaWMgcmVvcmRlcmFibGUgPSBmYWxzZSxcbiAgICAgICAgcHVibGljIHZpc2libGUgPSB0cnVlLFxuICAgICAgICBwdWJsaWMgcmVuZGVyPzogKHJvdzogVCkgPT4gYW55LFxuICAgICAgICBwdWJsaWMgZXh0cmFDbGFzcz86IChyb3c6IFQpID0+IHN0cmluZyxcbiAgICAgICAgcHVibGljIHZhbHVlcz86IGFueVtdXG4gICAgKSB7IH1cbiAgICBoYXNTZWxlY3QgPyA9IGZhbHNlO1xuICAgIFtrZXk6IHN0cmluZ106IGFueTtcbiAgICB3aXRoTGluazogUHJpbWVUYWJsZUNvbHVtbkxpbmsgPSBudWxsO1xufVxuIiwiZXhwb3J0IGNsYXNzIFByaW1lVGFibGVDb2x1bW5MaW5rIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIHN0YXRpY1BhdGg6IHN0cmluZyxcbiAgICAgICAgcHVibGljIGR5bmFtaWM/OiBzdHJpbmdcbiAgICApIHsgfVxufVxuIiwiaW1wb3J0IHsgTWVudUl0ZW0sIFRyZWVOb2RlIH0gZnJvbSAncHJpbWVuZy9hcGknO1xuXG5leHBvcnQgY2xhc3MgUHJpbWVUYWJsZUNvbnRleHRNZW51IHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGVuYWJsZWQ6IGJvb2xlYW4sXG4gICAgICAgIHB1YmxpYyBub2RlOiBUcmVlTm9kZSB8IGFueSxcbiAgICAgICAgcHVibGljIGl0ZW1zOiBNZW51SXRlbVtdXG4gICAgKSB7IH1cbn1cbiJdLCJuYW1lcyI6WyJJbmplY3RhYmxlIiwiQmVoYXZpb3JTdWJqZWN0IiwiRXZlbnRFbWl0dGVyIiwiQ29tcG9uZW50IiwiSW5wdXQiLCJPdXRwdXQiLCJIb3N0TGlzdGVuZXIiLCJOZ01vZHVsZSIsIkNvbW1vbk1vZHVsZSIsIkZvcm1zTW9kdWxlIiwiUmVhY3RpdmVGb3Jtc01vZHVsZSIsIlRhYmxlTW9kdWxlIiwiVHJlZVRhYmxlTW9kdWxlIiwiTXVsdGlTZWxlY3RNb2R1bGUiLCJEcm9wZG93bk1vZHVsZSIsIlRvb2x0aXBNb2R1bGUiLCJDb250ZXh0TWVu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