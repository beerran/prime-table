/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
export class PrimeTableConfig {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpbWUtdGFibGUtY29uZmlnLmpzIiwic291cmNlUm9vdCI6Im5nOi8vcHJpbWUtdGFibGUvIiwic291cmNlcyI6WyJsaWIvbW9kZWxzL3ByaW1lLXRhYmxlLWNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBS0EsTUFBTTs7OztJQUNGLFlBQ0ksTUFBb0Q7eUJBZ0NyQyxLQUFLO3dCQUVOLElBQUk7dUJBQ0wsSUFBSTtzQkFDTCxJQUFJO3dCQUNGLElBQUk7MEJBQ0YsS0FBSzt5QkFDTixLQUFLOzBCQUNKLEtBQUs7NkJBQ0YsS0FBSzswQkFDUixJQUFJOzBCQUNKLElBQUk7eUJBQ0csSUFBSTtvQkFDRyxJQUFJOzhCQUNkO1lBQ3BCLFNBQVMsRUFBRSxLQUFLO1lBQ2hCLFVBQVUsRUFBRSxLQUFLO1NBQ3BCO3VCQUN3QixJQUFJO2lDQUNNLElBQUk7b0JBQ0Y7WUFDakMsT0FBTyxFQUFFLEtBQUs7WUFDZCxJQUFJLEVBQUUsSUFBSTtZQUNWLEtBQUssRUFBRSxFQUFFO1NBQ1o7UUF0REcsUUFBUSxNQUFNLEVBQUU7WUFDWixLQUFLLE1BQU07Z0JBQ1AsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7Z0JBQ3RCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO2dCQUN2QixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztnQkFDMUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7Z0JBQ3BCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO2dCQUNqQixJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztnQkFDNUIsTUFBTTtZQUNOLEtBQUssV0FBVztnQkFDWixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztnQkFDdEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7Z0JBQzVCLE1BQU07WUFDTixLQUFLLFFBQVE7Z0JBQ1QsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7Z0JBQ3RCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO2dCQUNwQixJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7Z0JBQ3ZDLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO2dCQUM1QixNQUFNO1lBQ04sS0FBSyxVQUFVLENBQUM7WUFDaEI7Z0JBQ0ksSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO2dCQUN0QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztnQkFDdkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7Z0JBQ3hCLE1BQU07U0FDVDtLQUNKOzs7OztJQTZCTSxvQkFBb0IsQ0FBQyxZQUFvQjtRQUM1QyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsWUFBWSxDQUFDOzs7OztJQUduQyxLQUFLO1FBQ1IsSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7UUFDZixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7Ozs7OztJQUduQixVQUFVLENBQUMsSUFBNkI7UUFDM0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsWUFBUyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDMUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7Ozs7OztJQUV0QixPQUFPLENBQUMsSUFBVztRQUN0QixJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQzs7Ozs7O0lBRW5CLFdBQVcsQ0FBQyxJQUFXOztRQUMxQixNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUNyRSxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsR0FBRyxZQUFZLENBQUMsQ0FBQzs7Ozs7O0lBRzNCLE9BQU8sQ0FBQyxVQUFvQjtRQUMvQixVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDOzs7Ozs7SUFHdEMsTUFBTSxDQUFDLFVBQW9CO1FBQzlCLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7Ozs7Ozs7SUFHcEMsWUFBWSxDQUFDLElBQVcsRUFBRSxHQUFXOztRQUN6QyxJQUFJLFdBQVcsR0FBZSxFQUFFLENBQUM7UUFFakMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTs7WUFDWixNQUFNLFFBQVEsR0FBYSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQztZQUMxQyxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUMvRCxRQUFRLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2FBQ3pEO1lBQ0QsV0FBVyxHQUFHLENBQUMsR0FBRyxXQUFXLEVBQUUsUUFBUSxDQUFDLENBQUM7U0FDNUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxXQUFXLENBQUM7O0NBRTFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVHJlZU5vZGUgfSBmcm9tICdwcmltZW5nL2FwaSc7XG5cbmltcG9ydCB7IFByaW1lVGFibGVDb2x1bW4gfSBmcm9tICcuL3ByaW1lLXRhYmxlLWNvbHVtbic7XG5pbXBvcnQgeyBQcmltZVRhYmxlQ29udGV4dE1lbnUgfSBmcm9tICcuL3ByaW1lLXRhYmxlLWNvbnRleHQtbWVudSc7XG5cbmV4cG9ydCBjbGFzcyBQcmltZVRhYmxlQ29uZmlnIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJlc2V0OiAnZWFzeScgfCAnc3RhbmRhcmQnIHwgJ2RyaWxsZG93bicgfCAnZm9ybWF0J1xuICAgICkge1xuICAgICAgICBzd2l0Y2ggKHByZXNldCkge1xuICAgICAgICAgICAgY2FzZSAnZWFzeSc6XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRCdXR0b24gPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuZWRpdEJ1dHRvbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5hcmNoaXZlQnV0dG9uID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmV4cG9ydCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuc2l6ZSA9ICdzbSc7XG4gICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxhYmxlID0gZmFsc2U7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2RyaWxsZG93bic6XG4gICAgICAgICAgICAgICAgdGhpcy5kcmlsbGRvd24gPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsYWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdmb3JtYXQnOlxuICAgICAgICAgICAgICAgIHRoaXMucm93Q291bnQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLmV4cG9ydCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuY29sdW1uU2V0dGluZ3Muc2VsZWN0YWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuYXV0b0xheW91dCA9IGZhbHNlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdzdGFuZGFyZCc6XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRoaXMuZWRpdEJ1dHRvbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRCdXR0b24gPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsYWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5yb3dzU2hvd24gPSAxMDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIHB1YmxpYyBkYXRhOiBhbnlbXSB8IFRyZWVOb2RlW107XG4gICAgcHVibGljIGNvbHVtbnM6IFByaW1lVGFibGVDb2x1bW48YW55PltdO1xuICAgIHB1YmxpYyBkcmlsbGRvd24gPSBmYWxzZTtcblxuICAgIHB1YmxpYyByb3dDb3VudCA9IHRydWU7XG4gICAgcHVibGljIGZpbHRlcnMgPSB0cnVlO1xuICAgIHB1YmxpYyBleHBvcnQgPSB0cnVlO1xuICAgIHB1YmxpYyBzb3J0YWJsZSA9IHRydWU7XG4gICAgcHVibGljIHNjcm9sbGFibGUgPSBmYWxzZTtcbiAgICBwdWJsaWMgYWRkQnV0dG9uID0gZmFsc2U7XG4gICAgcHVibGljIGVkaXRCdXR0b24gPSBmYWxzZTtcbiAgICBwdWJsaWMgYXJjaGl2ZUJ1dHRvbiA9IGZhbHNlO1xuICAgIHB1YmxpYyByZXNwb25zaXZlID0gdHJ1ZTtcbiAgICBwdWJsaWMgYXV0b0xheW91dCA9IHRydWU7XG4gICAgcHVibGljIHJvd3NTaG93bjogbnVtYmVyID0gbnVsbDtcbiAgICBwdWJsaWMgc2l6ZTogJ3NtJyB8ICdtZCcgfCAnbGcnID0gJ21kJztcbiAgICBwdWJsaWMgY29sdW1uU2V0dGluZ3MgPSB7XG4gICAgICAgIHJlc2l6YWJsZTogZmFsc2UsXG4gICAgICAgIHNlbGVjdGFibGU6IGZhbHNlXG4gICAgfTtcbiAgICBwdWJsaWMgdG9vbHRpcDogc3RyaW5nID0gbnVsbDtcbiAgICBwdWJsaWMgZHJpbGxkb3duUHJvcGVydHk6IHN0cmluZyA9IG51bGw7XG4gICAgcHVibGljIG1lbnU6IFByaW1lVGFibGVDb250ZXh0TWVudSA9IHtcbiAgICAgICAgZW5hYmxlZDogZmFsc2UsXG4gICAgICAgIG5vZGU6IG51bGwsXG4gICAgICAgIGl0ZW1zOiBbXVxuICAgIH07XG5cbiAgICBwdWJsaWMgc2V0RHJpbGxkb3duUHJvcGVydHkocHJvcGVydHlOYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5kcmlsbGRvd25Qcm9wZXJ0eSA9IHByb3BlcnR5TmFtZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY2xlYXIoKSB7XG4gICAgICAgIHRoaXMuZGF0YSA9IFtdO1xuICAgICAgICB0aGlzLm1lbnUubm9kZSA9IG51bGw7XG4gICAgfVxuXG4gICAgcHVibGljIHNldENvbHVtbnMoY29sczogUHJpbWVUYWJsZUNvbHVtbjxhbnk+W10pIHtcbiAgICAgICAgY29scy5mb3JFYWNoKGNvbCA9PiBjb2wuZmllbGQgPSBjb2wubmFtZSk7XG4gICAgICAgIHRoaXMuY29sdW1ucyA9IFsuLi5jb2xzXTtcbiAgICB9XG4gICAgcHVibGljIHNldERhdGEoZGF0YTogYW55W10pIHtcbiAgICAgICAgdGhpcy5kYXRhID0gWy4uLmRhdGFdO1xuICAgIH1cbiAgICBwdWJsaWMgc2V0VHJlZURhdGEoZGF0YTogYW55W10pIHtcbiAgICAgICAgY29uc3QgdHJlZU5vZGVEYXRhID0gdGhpcy5nZXRUcmVlTm9kZXMoZGF0YSwgdGhpcy5kcmlsbGRvd25Qcm9wZXJ0eSk7XG4gICAgICAgIHRoaXMuZGF0YSA9IFsuLi50cmVlTm9kZURhdGFdO1xuICAgIH1cblxuICAgIHB1YmxpYyBkaXNhYmxlKHByb3BlcnRpZXM6IHN0cmluZ1tdKSB7XG4gICAgICAgIHByb3BlcnRpZXMuZm9yRWFjaChwID0+IHRoaXNbcF0gPSBmYWxzZSk7XG4gICAgfVxuXG4gICAgcHVibGljIGVuYWJsZShwcm9wZXJ0aWVzOiBzdHJpbmdbXSkge1xuICAgICAgICBwcm9wZXJ0aWVzLmZvckVhY2gocCA9PiB0aGlzW3BdID0gdHJ1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRUcmVlTm9kZXMoZGF0YTogYW55W10sIGtleTogc3RyaW5nKTogVHJlZU5vZGVbXSB7XG4gICAgICAgIGxldCB0cmFuc2Zvcm1lZDogVHJlZU5vZGVbXSA9IFtdO1xuXG4gICAgICAgIGRhdGEubWFwKGl0ZW0gPT4ge1xuICAgICAgICAgICAgY29uc3QgdHJlZU5vZGU6IFRyZWVOb2RlID0geyBkYXRhOiBpdGVtIH07XG4gICAgICAgICAgICBpZiAoaXRlbS5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIGl0ZW1ba2V5XSAmJiBpdGVtW2tleV0ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHRyZWVOb2RlLmNoaWxkcmVuID0gdGhpcy5nZXRUcmVlTm9kZXMoaXRlbVtrZXldLCBrZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdHJhbnNmb3JtZWQgPSBbLi4udHJhbnNmb3JtZWQsIHRyZWVOb2RlXTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHRyYW5zZm9ybWVkO1xuICAgIH1cbn1cbiJdfQ==