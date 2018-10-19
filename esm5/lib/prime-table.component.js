/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PrimeTableConfig } from './models/prime-table-config';
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
export { PrimeTableComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpbWUtdGFibGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vcHJpbWUtdGFibGUvIiwic291cmNlcyI6WyJsaWIvcHJpbWUtdGFibGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUU3RixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDOztJQWlFN0Q7UUFBQSxpQkFFQzt1QkExRGdCLElBQUksZ0JBQWdCLENBQUMsVUFBVSxDQUFDOzBCQUM3QixJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUM7MkJBQ2xDLEtBQUs7b0NBQ0ksS0FBSzt3QkFDMEI7WUFDM0QsT0FBTyxFQUFFO2dCQUNQLEVBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFDO2dCQUMzQixFQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBQztnQkFDdEIsRUFBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUM7Z0JBQ3hCLEVBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFDO2dCQUN4QixFQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBQztnQkFDeEIsRUFBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUM7YUFDM0I7WUFDRCxRQUFRLEVBQUUsSUFBSTtTQUNmOzRCQUlxQixLQUFLOzZCQUVILElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQzttQkEyQjNDLElBQUksWUFBWSxFQUFPO29CQUN0QixJQUFJLFlBQVksRUFBTzt1QkFDcEIsSUFBSSxZQUFZLEVBQU87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QUNOLE1BQU07MEJBQ04sTUFBTTsyQkFFTixZQUFZLFNBQUMsZUFBZSxFQUFFLENBQUMsUUFBUSxDQUFDOzs4QkEvRDNDOztTQVdhLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPbkluaXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU2VsZWN0SXRlbSwgVHJlZU5vZGUgfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFByaW1lVGFibGVDb25maWcgfSBmcm9tICcuL21vZGVscy9wcmltZS10YWJsZS1jb25maWcnO1xuaW1wb3J0IHsgUHJpbWVUYWJsZUNvbHVtbiB9IGZyb20gJy4vbW9kZWxzL3ByaW1lLXRhYmxlLWNvbHVtbic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2ItcHJpbWUtdGFibGUnLFxuICB0ZW1wbGF0ZVVybDogJy4vcHJpbWUtdGFibGUuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZXM6IFtdXG59KVxuZXhwb3J0IGNsYXNzIFByaW1lVGFibGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBwdWJsaWMgX2NvbmZpZyA9IG5ldyBQcmltZVRhYmxlQ29uZmlnKCdzdGFuZGFyZCcpO1xuICBwdWJsaWMgZGF0YUxvYWRlZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBwdWJsaWMgc2hvd0ZpbHRlcnMgPSBmYWxzZTtcbiAgcHVibGljIGhhc1Jlb3JkZXJhYmxlQ29sdW1uID0gZmFsc2U7XG4gIHB1YmxpYyByb3dDb3VudDoge29wdGlvbnM6IFNlbGVjdEl0ZW1bXSwgc2VsZWN0ZWQ6IG51bWJlcn0gPSB7XG4gICAgb3B0aW9uczogW1xuICAgICAge2xhYmVsOiAnQWxsJywgdmFsdWU6IG51bGx9LFxuICAgICAge2xhYmVsOiAnNScsIHZhbHVlOiA1fSxcbiAgICAgIHtsYWJlbDogJzEwJywgdmFsdWU6IDEwfSxcbiAgICAgIHtsYWJlbDogJzI1JywgdmFsdWU6IDI1fSxcbiAgICAgIHtsYWJlbDogJzUwJywgdmFsdWU6IDUwfSxcbiAgICAgIHtsYWJlbDogJzEwMCcsIHZhbHVlOiAxMDB9XG4gICAgXSxcbiAgICBzZWxlY3RlZDogbnVsbFxuICB9O1xuICBwdWJsaWMgc2VsZWN0ZWRDb2x1bW5zOiBhbnlbXTtcbiAgcHVibGljIHNlbGVjdGVkUm93czogYW55W107XG5cbiAgcHVibGljIHNjcmVlbkhlaWdodCA9ICcwcHgnO1xuXG4gIHByaXZhdGUgY29sdW1uc0xvYWRlZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuXG4gIEBJbnB1dCgnY29uZmlnJylcbiAgc2V0IGNvbmZpZyhpbnB1dDogUHJpbWVUYWJsZUNvbmZpZykge1xuICAgIGlmIChpbnB1dCkge1xuICAgICAgdGhpcy5fY29uZmlnID0gaW5wdXQ7XG4gICAgICB0aGlzLnNldHVwQ29sdW1ucygpO1xuICAgICAgdGhpcy5zZXR1cERhdGEoKTtcbiAgICAgIHRoaXMucm93Q291bnQuc2VsZWN0ZWQgPSB0aGlzLl9jb25maWcucm93c1Nob3duO1xuICAgIH1cbiAgfVxuXG4gIEBJbnB1dCgnZGF0YScpXG4gIHNldCBkYXRhKGRhdGE6IGFueVtdIHwgVHJlZU5vZGVbXSkge1xuICAgIGlmIChkYXRhKSB7XG4gICAgICB0aGlzLl9jb25maWcuZHJpbGxkb3duID8gdGhpcy5fY29uZmlnLnNldFRyZWVEYXRhKGRhdGEpXG4gICAgICA6IHRoaXMuX2NvbmZpZy5zZXREYXRhKGRhdGEpO1xuICAgICAgdGhpcy5zZXR1cERhdGEoKTtcbiAgICB9XG4gIH1cblxuICBASW5wdXQoJ2NvbHVtbnMnKVxuICBzZXQgY29sdW1ucyhjb2x1bW5zOiBQcmltZVRhYmxlQ29sdW1uPGFueT5bXSkge1xuICAgIHRoaXMuX2NvbmZpZy5zZXRDb2x1bW5zKGNvbHVtbnMpO1xuICAgIHRoaXMuc2V0dXBDb2x1bW5zKCk7XG4gIH1cblxuICBAT3V0cHV0KCkgYWRkID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSBlZGl0ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSBhcmNoaXZlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQEhvc3RMaXN0ZW5lcignd2luZG93OnJlc2l6ZScsIFsnJGV2ZW50J10pXG4gIG9uUmVzaXplKGV2ZW50Pykge1xuICAgIHRoaXMuc2NyZWVuSGVpZ2h0ID0gKHdpbmRvdy5pbm5lckhlaWdodCAtIDM1MCkgKyAncHgnO1xuICB9XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5vblJlc2l6ZSgpO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKHRoaXMuaGFzUmVvcmRlcmFibGVDb2x1bW4pIHtcbiAgICAgIC8vIFRvRG86IEZpeCBmb3IgZHJpbGxkb3duIHRhYmxlc1xuICAgICAgdGhpcy5kYXRhTG9hZGVkLnN1YnNjcmliZShkYXRhTG9hZGVkID0+IHtcbiAgICAgICAgaWYgKGRhdGFMb2FkZWQpIHtcbiAgICAgICAgICBjb25zdCByZW9yZGVyYWJsZUNvbHVtbiA9IHRoaXMuX2NvbmZpZy5jb2x1bW5zLmZpbmQoY29sID0+IGNvbC5yZW9yZGVyYWJsZSA9PT0gdHJ1ZSk7XG4gICAgICAgICAgdGhpcy5fY29uZmlnLnNvcnRhYmxlID0gZmFsc2U7XG4gICAgICAgICAgKHRoaXMuX2NvbmZpZy5kYXRhIGFzIGFueVtdKS5zb3J0KChpdGVtMSwgaXRlbTIpID0+IGl0ZW0xW3Jlb3JkZXJhYmxlQ29sdW1uLm5hbWVdIC0gaXRlbTJbcmVvcmRlcmFibGVDb2x1bW4ubmFtZV0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNldHVwRGF0YSgpIHtcbiAgICB0aGlzLmRhdGFMb2FkZWQubmV4dCh0cnVlKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0dXBDb2x1bW5zKCkge1xuICAgIHRoaXMuc2VsZWN0ZWRDb2x1bW5zID0gdGhpcy5fY29uZmlnLmNvbHVtbnMuZmlsdGVyKGNvbCA9PiBjb2wudmlzaWJsZSAhPT0gZmFsc2UpO1xuICAgIHRoaXMuaGFzUmVvcmRlcmFibGVDb2x1bW4gPSB0aGlzLl9jb25maWcuY29sdW1ucy5maW5kSW5kZXgoY29sID0+IGNvbC5yZW9yZGVyYWJsZSA9PT0gdHJ1ZSkgPj0gMDtcbiAgICB0aGlzLl9jb25maWcuY29sdW1ucy5mb3JFYWNoKGNvbCA9PiBjb2wuaGFzU2VsZWN0ID0gY29sLnZhbHVlcyAmJiBjb2wudmFsdWVzLmxlbmd0aCA+IDEpO1xuICAgIHRoaXMuY29sdW1uc0xvYWRlZC5uZXh0KHRydWUpO1xuICB9XG5cbiAgcm93UmVvcmRlcmVkID0gKGV2ZW50OiB7ZHJhZ0luZGV4OiBudW1iZXIsIGRyb3BJbmRleDogbnVtYmVyfSkgPT4ge1xuICAgIGlmIChldmVudC5kcm9wSW5kZXggPj0gZXZlbnQuZHJhZ0luZGV4KSB7XG4gICAgICAvLyBCdWcgaW4gUHJpbWVOZywgd2hlbiBkcmFnZ2luZyB1cC9cIm9uIHRvcFwiIG9mIGFub3RoZXIgcm93IGl0IGdldHMgdGhlIHdyb25nIGluZGV4XG4gICAgICBldmVudC5kcm9wSW5kZXgtLTtcbiAgICB9XG4gICAgY29uc3QgcmVvcmRlcmFibGVDb2x1bW4gPSB0aGlzLl9jb25maWcuY29sdW1ucy5maW5kKGNvbCA9PiBjb2wucmVvcmRlcmFibGUgPT09IHRydWUpO1xuICAgIHRoaXMuX2NvbmZpZy5kYXRhW2V2ZW50LmRyb3BJbmRleF1bcmVvcmRlcmFibGVDb2x1bW4ubmFtZV0gPSBldmVudC5kcm9wSW5kZXggKyAxO1xuICAgIGlmIChldmVudC5kcm9wSW5kZXggPiBldmVudC5kcmFnSW5kZXgpIHtcbiAgICAgIGZvciAobGV0IGkgPSBldmVudC5kcmFnSW5kZXg7IGkgPCBldmVudC5kcm9wSW5kZXg7IGkrKykge1xuICAgICAgICB0aGlzLl9jb25maWcuZGF0YVtpXVtyZW9yZGVyYWJsZUNvbHVtbi5uYW1lXSA9IGkgKyAxO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGxldCBpID0gZXZlbnQuZHJvcEluZGV4OyBpIDw9IGV2ZW50LmRyYWdJbmRleDsgaSsrKSB7XG4gICAgICAgIHRoaXMuX2NvbmZpZy5kYXRhW2ldW3Jlb3JkZXJhYmxlQ29sdW1uLm5hbWVdID0gaSArIDE7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdG9nZ2xlRmlsdGVycyA9ICgpID0+IHRoaXMuc2hvd0ZpbHRlcnMgPSAhdGhpcy5zaG93RmlsdGVycztcblxuICBnZXRDZWxsVmFsdWUocm93OiBhbnksIGNvbDogUHJpbWVUYWJsZUNvbHVtbjxhbnk+KSB7XG4gICAgaWYgKGNvbC5yZW5kZXIpIHtcbiAgICAgIHJldHVybiBjb2wucmVuZGVyKHJvdyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnJlc29sdmVLZXkoY29sLm5hbWUsIHJvdyk7XG4gICAgfVxuICB9XG5cbiAgZ2V0TGlua1ZhbHVlKHJvdzogYW55LCBjb2w6IFByaW1lVGFibGVDb2x1bW48YW55Pikge1xuICAgIGNvbnN0IGR5bmFtaWNQYXRoID0gY29sLndpdGhMaW5rLmR5bmFtaWMgPyAnLycgKyB0aGlzLnJlc29sdmVLZXkoY29sLndpdGhMaW5rLmR5bmFtaWMsIHJvdykgOiAnJztcbiAgICByZXR1cm4gY29sLndpdGhMaW5rLnN0YXRpY1BhdGggKyBkeW5hbWljUGF0aDtcbiAgfVxuXG4gIHByaXZhdGUgcmVzb2x2ZUtleSA9IChrZXk6IHN0cmluZywgb2JqOiBhbnkpOiBzdHJpbmcgPT4ge1xuICAgIHJldHVybiBrZXkuc3BsaXQoJy4nKS5yZWR1Y2UoKHByZXY6IGFueSwgY3VycjogYW55KSA9PiBwcmV2ID8gcHJldltjdXJyXSA6IG51bGwgLCBvYmopO1xuICB9XG59XG4iXX0=