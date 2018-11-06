import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base.component';
import { PrimeTableConfig, PrimeTableColumn } from 'prime-table';
import { SnotifyService } from 'ng-snotify';
import { SharedStuff } from '../shared';

@Component({
  selector: 'app-editable',
  templateUrl: './editable.component.html',
  styleUrls: ['./editable.component.css']
})
export class EditableComponent extends BaseComponent implements OnInit {
  tableConfig = new PrimeTableConfig('standard');
  infoText = 'Allow inline editing for all rows on the fly';
  constructor(protected snotify: SnotifyService) {
    super(snotify);
  }

  ngOnInit() {
    const selectCol = new PrimeTableColumn('E-mail', 'email', false, false, true, null, null);
    selectCol.withSelect = {
      label: 'text',
      values: [
        {
          value: 'professional@email.com',
          text: 'Professional Email'
        },
        {
          value: 'private@email.com',
          text: 'Private Email'
        }
      ],
      placeholder: 'Select',
      change: (event, row, col) =>
        this.snotify.success(`Column value for row changed. Event value: ${JSON.stringify(event.value)}`, `${col.name} col`)
    };
    let cols = SharedStuff.GetColumns().map(col => {
      if (col.name !== 'order' && col.name !== 'id-') {
        col.editable = true;
      }
      return col;
    });
    cols = cols.slice(0, cols.length - 1);
    cols = [...cols, selectCol];
    this.tableConfig.sortable = false;
    this.tableConfig.archiveButton = true;
    this.tableConfig.setColumns(cols);
    this.tableConfig.setData(SharedStuff.GetData());
  }
}
