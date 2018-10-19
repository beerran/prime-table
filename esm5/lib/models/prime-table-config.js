/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
        this.columns = tslib_1.__spread(cols);
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
        this.data = tslib_1.__spread(data);
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
        this.data = tslib_1.__spread(treeNodeData);
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
            transformed = tslib_1.__spread(transformed, [treeNode]);
        });
        return transformed;
    };
    return PrimeTableConfig;
}());
export { PrimeTableConfig };
if (false) {
    /** @type {?} */
    PrimeTableConfig.prototype.data;
    /** @type {?} */
    PrimeTableConfig.prototype.columns;
    /** @type {?} */
    PrimeTableConfig.prototype.drilldown;
    /** @type {?} */
    PrimeTableConfig.prototype.rowCount;
    /** @type {?} */
    PrimeTableConfig.prototype.filters;
    /** @type {?} */
    PrimeTableConfig.prototype.export;
    /** @type {?} */
    PrimeTableConfig.prototype.sortable;
    /** @type {?} */
    PrimeTableConfig.prototype.scrollable;
    /** @type {?} */
    PrimeTableConfig.prototype.addButton;
    /** @type {?} */
    PrimeTableConfig.prototype.editButton;
    /** @type {?} */
    PrimeTableConfig.prototype.archiveButton;
    /** @type {?} */
    PrimeTableConfig.prototype.responsive;
    /** @type {?} */
    PrimeTableConfig.prototype.autoLayout;
    /** @type {?} */
    PrimeTableConfig.prototype.rowsShown;
    /** @type {?} */
    PrimeTableConfig.prototype.size;
    /** @type {?} */
    PrimeTableConfig.prototype.columnSettings;
    /** @type {?} */
    PrimeTableConfig.prototype.tooltip;
    /** @type {?} */
    PrimeTableConfig.prototype.drilldownProperty;
    /** @type {?} */
    PrimeTableConfig.prototype.menu;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpbWUtdGFibGUtY29uZmlnLmpzIiwic291cmNlUm9vdCI6Im5nOi8vcHJpbWUtdGFibGUvIiwic291cmNlcyI6WyJsaWIvbW9kZWxzL3ByaW1lLXRhYmxlLWNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUtBLElBQUE7SUFDSSwwQkFDSSxNQUFvRDt5QkFnQ3JDLEtBQUs7d0JBRU4sSUFBSTt1QkFDTCxJQUFJO3NCQUNMLElBQUk7d0JBQ0YsSUFBSTswQkFDRixLQUFLO3lCQUNOLEtBQUs7MEJBQ0osS0FBSzs2QkFDRixLQUFLOzBCQUNSLElBQUk7MEJBQ0osSUFBSTt5QkFDRyxJQUFJO29CQUNHLElBQUk7OEJBQ2Q7WUFDcEIsU0FBUyxFQUFFLEtBQUs7WUFDaEIsVUFBVSxFQUFFLEtBQUs7U0FDcEI7dUJBQ3dCLElBQUk7aUNBQ00sSUFBSTtvQkFDRjtZQUNqQyxPQUFPLEVBQUUsS0FBSztZQUNkLElBQUksRUFBRSxJQUFJO1lBQ1YsS0FBSyxFQUFFLEVBQUU7U0FDWjtRQXRERyxRQUFRLE1BQU0sRUFBRTtZQUNaLEtBQUssTUFBTTtnQkFDUCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztnQkFDdEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO2dCQUMxQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztnQkFDcEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7Z0JBQ2pCLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO2dCQUM1QixNQUFNO1lBQ04sS0FBSyxXQUFXO2dCQUNaLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO2dCQUN0QixJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztnQkFDNUIsTUFBTTtZQUNOLEtBQUssUUFBUTtnQkFDVCxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztnQkFDdEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7Z0JBQ3BCLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztnQkFDdkMsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7Z0JBQzVCLE1BQU07WUFDTixLQUFLLFVBQVUsQ0FBQztZQUNoQjtnQkFDSSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztnQkFDdkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7Z0JBQ3RCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO2dCQUN2QixJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztnQkFDeEIsTUFBTTtTQUNUO0tBQ0o7Ozs7O0lBNkJNLCtDQUFvQjs7OztjQUFDLFlBQW9CO1FBQzVDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxZQUFZLENBQUM7Ozs7O0lBR25DLGdDQUFLOzs7O1FBQ1IsSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7UUFDZixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7Ozs7OztJQUduQixxQ0FBVTs7OztjQUFDLElBQTZCO1FBQzNDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLFlBQVMsR0FBRyxDQUFDLElBQUksRUFBcEIsQ0FBb0IsQ0FBQyxDQUFDO1FBQzFDLElBQUksQ0FBQyxPQUFPLG9CQUFPLElBQUksQ0FBQyxDQUFDOzs7Ozs7SUFFdEIsa0NBQU87Ozs7Y0FBQyxJQUFXO1FBQ3RCLElBQUksQ0FBQyxJQUFJLG9CQUFPLElBQUksQ0FBQyxDQUFDOzs7Ozs7SUFFbkIsc0NBQVc7Ozs7Y0FBQyxJQUFXOztRQUMxQixJQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUNyRSxJQUFJLENBQUMsSUFBSSxvQkFBTyxZQUFZLENBQUMsQ0FBQzs7Ozs7O0lBRzNCLGtDQUFPOzs7O2NBQUMsVUFBb0I7O1FBQy9CLFVBQVUsQ0FBQyxPQUFPLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxLQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxFQUFmLENBQWUsQ0FBQyxDQUFDOzs7Ozs7SUFHdEMsaUNBQU07Ozs7Y0FBQyxVQUFvQjs7UUFDOUIsVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLEtBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLEVBQWQsQ0FBYyxDQUFDLENBQUM7Ozs7Ozs7SUFHcEMsdUNBQVk7Ozs7O2NBQUMsSUFBVyxFQUFFLEdBQVc7OztRQUN6QyxJQUFJLFdBQVcsR0FBZSxFQUFFLENBQUM7UUFFakMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFBLElBQUk7O1lBQ1QsSUFBTSxRQUFRLEdBQWEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUM7WUFDMUMsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDL0QsUUFBUSxDQUFDLFFBQVEsR0FBRyxLQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQzthQUN6RDtZQUNELFdBQVcsb0JBQU8sV0FBVyxHQUFFLFFBQVEsRUFBQyxDQUFDO1NBQzVDLENBQUMsQ0FBQztRQUVILE9BQU8sV0FBVyxDQUFDOzsyQkF6RzNCO0lBMkdDLENBQUE7QUF0R0QsNEJBc0dDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVHJlZU5vZGUgfSBmcm9tICdwcmltZW5nL2FwaSc7XG5cbmltcG9ydCB7IFByaW1lVGFibGVDb2x1bW4gfSBmcm9tICcuL3ByaW1lLXRhYmxlLWNvbHVtbic7XG5pbXBvcnQgeyBQcmltZVRhYmxlQ29udGV4dE1lbnUgfSBmcm9tICcuL3ByaW1lLXRhYmxlLWNvbnRleHQtbWVudSc7XG5cbmV4cG9ydCBjbGFzcyBQcmltZVRhYmxlQ29uZmlnIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJlc2V0OiAnZWFzeScgfCAnc3RhbmRhcmQnIHwgJ2RyaWxsZG93bicgfCAnZm9ybWF0J1xuICAgICkge1xuICAgICAgICBzd2l0Y2ggKHByZXNldCkge1xuICAgICAgICAgICAgY2FzZSAnZWFzeSc6XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRCdXR0b24gPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuZWRpdEJ1dHRvbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5hcmNoaXZlQnV0dG9uID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmV4cG9ydCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuc2l6ZSA9ICdzbSc7XG4gICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxhYmxlID0gZmFsc2U7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2RyaWxsZG93bic6XG4gICAgICAgICAgICAgICAgdGhpcy5kcmlsbGRvd24gPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsYWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdmb3JtYXQnOlxuICAgICAgICAgICAgICAgIHRoaXMucm93Q291bnQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLmV4cG9ydCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuY29sdW1uU2V0dGluZ3Muc2VsZWN0YWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuYXV0b0xheW91dCA9IGZhbHNlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdzdGFuZGFyZCc6XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRoaXMuZWRpdEJ1dHRvbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRCdXR0b24gPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsYWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5yb3dzU2hvd24gPSAxMDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIHB1YmxpYyBkYXRhOiBhbnlbXSB8IFRyZWVOb2RlW107XG4gICAgcHVibGljIGNvbHVtbnM6IFByaW1lVGFibGVDb2x1bW48YW55PltdO1xuICAgIHB1YmxpYyBkcmlsbGRvd24gPSBmYWxzZTtcblxuICAgIHB1YmxpYyByb3dDb3VudCA9IHRydWU7XG4gICAgcHVibGljIGZpbHRlcnMgPSB0cnVlO1xuICAgIHB1YmxpYyBleHBvcnQgPSB0cnVlO1xuICAgIHB1YmxpYyBzb3J0YWJsZSA9IHRydWU7XG4gICAgcHVibGljIHNjcm9sbGFibGUgPSBmYWxzZTtcbiAgICBwdWJsaWMgYWRkQnV0dG9uID0gZmFsc2U7XG4gICAgcHVibGljIGVkaXRCdXR0b24gPSBmYWxzZTtcbiAgICBwdWJsaWMgYXJjaGl2ZUJ1dHRvbiA9IGZhbHNlO1xuICAgIHB1YmxpYyByZXNwb25zaXZlID0gdHJ1ZTtcbiAgICBwdWJsaWMgYXV0b0xheW91dCA9IHRydWU7XG4gICAgcHVibGljIHJvd3NTaG93bjogbnVtYmVyID0gbnVsbDtcbiAgICBwdWJsaWMgc2l6ZTogJ3NtJyB8ICdtZCcgfCAnbGcnID0gJ21kJztcbiAgICBwdWJsaWMgY29sdW1uU2V0dGluZ3MgPSB7XG4gICAgICAgIHJlc2l6YWJsZTogZmFsc2UsXG4gICAgICAgIHNlbGVjdGFibGU6IGZhbHNlXG4gICAgfTtcbiAgICBwdWJsaWMgdG9vbHRpcDogc3RyaW5nID0gbnVsbDtcbiAgICBwdWJsaWMgZHJpbGxkb3duUHJvcGVydHk6IHN0cmluZyA9IG51bGw7XG4gICAgcHVibGljIG1lbnU6IFByaW1lVGFibGVDb250ZXh0TWVudSA9IHtcbiAgICAgICAgZW5hYmxlZDogZmFsc2UsXG4gICAgICAgIG5vZGU6IG51bGwsXG4gICAgICAgIGl0ZW1zOiBbXVxuICAgIH07XG5cbiAgICBwdWJsaWMgc2V0RHJpbGxkb3duUHJvcGVydHkocHJvcGVydHlOYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5kcmlsbGRvd25Qcm9wZXJ0eSA9IHByb3BlcnR5TmFtZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY2xlYXIoKSB7XG4gICAgICAgIHRoaXMuZGF0YSA9IFtdO1xuICAgICAgICB0aGlzLm1lbnUubm9kZSA9IG51bGw7XG4gICAgfVxuXG4gICAgcHVibGljIHNldENvbHVtbnMoY29sczogUHJpbWVUYWJsZUNvbHVtbjxhbnk+W10pIHtcbiAgICAgICAgY29scy5mb3JFYWNoKGNvbCA9PiBjb2wuZmllbGQgPSBjb2wubmFtZSk7XG4gICAgICAgIHRoaXMuY29sdW1ucyA9IFsuLi5jb2xzXTtcbiAgICB9XG4gICAgcHVibGljIHNldERhdGEoZGF0YTogYW55W10pIHtcbiAgICAgICAgdGhpcy5kYXRhID0gWy4uLmRhdGFdO1xuICAgIH1cbiAgICBwdWJsaWMgc2V0VHJlZURhdGEoZGF0YTogYW55W10pIHtcbiAgICAgICAgY29uc3QgdHJlZU5vZGVEYXRhID0gdGhpcy5nZXRUcmVlTm9kZXMoZGF0YSwgdGhpcy5kcmlsbGRvd25Qcm9wZXJ0eSk7XG4gICAgICAgIHRoaXMuZGF0YSA9IFsuLi50cmVlTm9kZURhdGFdO1xuICAgIH1cblxuICAgIHB1YmxpYyBkaXNhYmxlKHByb3BlcnRpZXM6IHN0cmluZ1tdKSB7XG4gICAgICAgIHByb3BlcnRpZXMuZm9yRWFjaChwID0+IHRoaXNbcF0gPSBmYWxzZSk7XG4gICAgfVxuXG4gICAgcHVibGljIGVuYWJsZShwcm9wZXJ0aWVzOiBzdHJpbmdbXSkge1xuICAgICAgICBwcm9wZXJ0aWVzLmZvckVhY2gocCA9PiB0aGlzW3BdID0gdHJ1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRUcmVlTm9kZXMoZGF0YTogYW55W10sIGtleTogc3RyaW5nKTogVHJlZU5vZGVbXSB7XG4gICAgICAgIGxldCB0cmFuc2Zvcm1lZDogVHJlZU5vZGVbXSA9IFtdO1xuXG4gICAgICAgIGRhdGEubWFwKGl0ZW0gPT4ge1xuICAgICAgICAgICAgY29uc3QgdHJlZU5vZGU6IFRyZWVOb2RlID0geyBkYXRhOiBpdGVtIH07XG4gICAgICAgICAgICBpZiAoaXRlbS5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIGl0ZW1ba2V5XSAmJiBpdGVtW2tleV0ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHRyZWVOb2RlLmNoaWxkcmVuID0gdGhpcy5nZXRUcmVlTm9kZXMoaXRlbVtrZXldLCBrZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdHJhbnNmb3JtZWQgPSBbLi4udHJhbnNmb3JtZWQsIHRyZWVOb2RlXTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHRyYW5zZm9ybWVkO1xuICAgIH1cbn1cbiJdfQ==