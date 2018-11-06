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

export const ROUTES = [
  {
    route: {path: '', redirectTo: 'home', pathMatch: 'full'},
    showInMenu: false
  },
  {
    route: {path: 'home', component: HomeComponent},
    label: 'Home',
    showInMenu: true
  },
  {
    route: {path: 'expanded', component: ExpandedComponent},
    label: 'Expanded rows',
    showInMenu: true
  },
  {
    route: {path: 'selectable', component: SelectableComponent},
    label: 'Selectable rows',
    showInMenu: true
  },
  {
    route: {path: 'sortable', component: SortableComponent},
    label: 'Sortable columns',
    showInMenu: true
  },
  {
    route: {path: 'reorderable', component: ReorderableComponent},
    label: 'Reorderable rows',
    showInMenu: true
  },
  {
    route: {path: 'editable', component: EditableComponent},
    label: 'Editable columns',
    showInMenu: true
  },
  {
    route: {path: 'rowclass', component: RowclassComponent},
    label: 'Custom column/row classes',
    showInMenu: true
  }
];


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SnotifyModule,
    PrimeTableModule,
    RouterModule.forRoot(ROUTES.map(route => route.route))
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
