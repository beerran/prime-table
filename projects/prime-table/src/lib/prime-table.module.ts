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

@NgModule({
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
})
export class PrimeTableModule { }
