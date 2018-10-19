(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core')) :
    typeof define === 'function' && define.amd ? define('prime-table', ['exports', '@angular/core'], factory) :
    (factory((global['prime-table'] = {}),global.ng.core));
}(this, (function (exports,i0) { 'use strict';

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

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var PrimeTableComponent = /** @class */ (function () {
        function PrimeTableComponent() {
        }
        /**
         * @return {?}
         */
        PrimeTableComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
            };
        PrimeTableComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'b-prime-table',
                        template: "\n    <p>\n      Testing npm publish\n    </p>\n  "
                    }] }
        ];
        /** @nocollapse */
        PrimeTableComponent.ctorParameters = function () { return []; };
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
                        imports: [],
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
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    exports.PrimeTableService = PrimeTableService;
    exports.PrimeTableComponent = PrimeTableComponent;
    exports.PrimeTableModule = PrimeTableModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpbWUtdGFibGUudW1kLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9wcmltZS10YWJsZS9saWIvcHJpbWUtdGFibGUuc2VydmljZS50cyIsIm5nOi8vcHJpbWUtdGFibGUvbGliL3ByaW1lLXRhYmxlLmNvbXBvbmVudC50cyIsIm5nOi8vcHJpbWUtdGFibGUvbGliL3ByaW1lLXRhYmxlLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFByaW1lVGFibGVTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYi1wcmltZS10YWJsZScsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHA+XG4gICAgICBUZXN0aW5nIG5wbSBwdWJsaXNoXG4gICAgPC9wPlxuICBgLFxuICBzdHlsZXM6IFtdXG59KVxuZXhwb3J0IGNsYXNzIFByaW1lVGFibGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFByaW1lVGFibGVDb21wb25lbnQgfSBmcm9tICcuL3ByaW1lLXRhYmxlLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbUHJpbWVUYWJsZUNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtQcmltZVRhYmxlQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBQcmltZVRhYmxlTW9kdWxlIHsgfVxuIl0sIm5hbWVzIjpbIkluamVjdGFibGUiLCJDb21wb25lbnQiLCJOZ01vZHVsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO1FBT0U7U0FBaUI7O29CQUxsQkEsYUFBVSxTQUFDO3dCQUNWLFVBQVUsRUFBRSxNQUFNO3FCQUNuQjs7Ozs7Z0NBSkQ7Ozs7Ozs7QUNBQTtRQWFFO1NBQWlCOzs7O1FBRWpCLHNDQUFROzs7WUFBUjthQUNDOztvQkFkRkMsWUFBUyxTQUFDO3dCQUNULFFBQVEsRUFBRSxlQUFlO3dCQUN6QixRQUFRLEVBQUUsb0RBSVQ7cUJBRUY7Ozs7a0NBVkQ7Ozs7Ozs7QUNBQTs7OztvQkFHQ0MsV0FBUSxTQUFDO3dCQUNSLE9BQU8sRUFBRSxFQUNSO3dCQUNELFlBQVksRUFBRSxDQUFDLG1CQUFtQixDQUFDO3dCQUNuQyxPQUFPLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQztxQkFDL0I7OytCQVJEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OyJ9