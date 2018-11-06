import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Route, RouterModule } from '@angular/router';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { PrimeTableModule } from 'projects/prime-table/src/lib/prime-table.module';

import { AppComponent } from './app.component';
import { EditableComponent } from './editable/editable.component';
import { ExpandedComponent } from './expanded/expanded.component';
import { HomeComponent } from './home/home.component';
import { ReorderableComponent } from './reorderable/reorderable.component';
import { RowclassComponent } from './rowclass/rowclass.component';
import { SelectableComponent } from './selectable/selectable.component';
import { SortableComponent } from './sortable/sortable.component';

// Local dev
// Packaged
// import { PrimeTableModule } from 'prime-table';

const routes: Route[] = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'expanded', component: ExpandedComponent},
  {path: 'selectable', component: SelectableComponent},
  {path: 'sortable', component: SortableComponent},
  {path: 'reorderable', component: ReorderableComponent},
  {path: 'editable', component: EditableComponent},
  {path: 'rowclass', component: RowclassComponent}
];
export const ROUTES = [
  {
    route: {path: 'home'},
    label: 'Home'
  },
  {
    route: {path: 'expanded'},
    label: 'Expanded rows'
  },
  {
    route: {path: 'selectable'},
    label: 'Selectable rows'
  },
  {
    route: {path: 'sortable'},
    label: 'Sortable columns'
  },
  {
    route: {path: 'reorderable'},
    label: 'Reorderable rows'
  },
  {
    route: {path: 'editable'},
    label: 'Editable columns'
  },
  {
    route: {path: 'rowclass'},
    label: 'Custom column/row classes'
  }
];

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SnotifyModule,
    PrimeTableModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [
    AppComponent,
    ExpandedComponent,
    RowclassComponent,
    EditableComponent,
    ReorderableComponent,
    SortableComponent,
    SelectableComponent,
    HomeComponent
  ],
  providers: [
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults},
    SnotifyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
