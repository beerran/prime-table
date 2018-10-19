/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { TreeTableModule } from 'primeng/treetable';
import { PrimeTableComponent } from './prime-table.component';
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
export { PrimeTableModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpbWUtdGFibGUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vcHJpbWUtdGFibGUvIiwic291cmNlcyI6WyJsaWIvcHJpbWUtdGFibGUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDeEQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDNUMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUVwRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7Ozs7Z0JBRTdELFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixXQUFXO3dCQUNYLG1CQUFtQjt3QkFDbkIsV0FBVzt3QkFDWCxlQUFlO3dCQUNmLGlCQUFpQjt3QkFDakIsY0FBYzt3QkFDZCxhQUFhO3dCQUNiLGlCQUFpQjtxQkFDbEI7b0JBQ0QsWUFBWSxFQUFFLENBQUMsbUJBQW1CLENBQUM7b0JBQ25DLE9BQU8sRUFBRSxDQUFDLG1CQUFtQixDQUFDO2lCQUMvQjs7MkJBMUJEOztTQTJCYSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQ29udGV4dE1lbnVNb2R1bGUgfSBmcm9tICdwcmltZW5nL2NvbnRleHRtZW51JztcbmltcG9ydCB7IERyb3Bkb3duTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9kcm9wZG93bic7XG5pbXBvcnQgeyBNdWx0aVNlbGVjdE1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvbXVsdGlzZWxlY3QnO1xuaW1wb3J0IHsgVGFibGVNb2R1bGUgfSBmcm9tICdwcmltZW5nL3RhYmxlJztcbmltcG9ydCB7IFRvb2x0aXBNb2R1bGUgfSBmcm9tICdwcmltZW5nL3Rvb2x0aXAnO1xuaW1wb3J0IHsgVHJlZVRhYmxlTW9kdWxlIH0gZnJvbSAncHJpbWVuZy90cmVldGFibGUnO1xuXG5pbXBvcnQgeyBQcmltZVRhYmxlQ29tcG9uZW50IH0gZnJvbSAnLi9wcmltZS10YWJsZS5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgVGFibGVNb2R1bGUsXG4gICAgVHJlZVRhYmxlTW9kdWxlLFxuICAgIE11bHRpU2VsZWN0TW9kdWxlLFxuICAgIERyb3Bkb3duTW9kdWxlLFxuICAgIFRvb2x0aXBNb2R1bGUsXG4gICAgQ29udGV4dE1lbnVNb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1ByaW1lVGFibGVDb21wb25lbnRdLFxuICBleHBvcnRzOiBbUHJpbWVUYWJsZUNvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgUHJpbWVUYWJsZU1vZHVsZSB7IH1cbiJdfQ==