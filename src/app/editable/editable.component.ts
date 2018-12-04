import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base.component';
import { SnotifyService } from 'ng-snotify';
import { SharedStuff } from '../shared';
import { Service } from '../app.service';
import { PrimeTableConfig, PrimeTableColumn } from 'prime-table';
import { of } from 'rxjs';
import { switchMap, debounceTime } from 'rxjs/operators';
@Component({
  selector: 'app-editable',
  templateUrl: './editable.component.html',
  styleUrls: ['./editable.component.css']
})
export class EditableComponent extends BaseComponent implements OnInit {
  tableConfig = new PrimeTableConfig('standard');
  infoText = 'Allow inline editing for all rows on the fly';
  selectData: {value: string, text: string}[] = [];
  selectCol = new PrimeTableColumn('E-mail', 'email', false, false, true, null, null);

  constructor(protected snotify: SnotifyService, private service: Service) {
    super(snotify);
  }

  ngOnInit() {
    this.selectCol.withSelect = {
      label: 'text',
      values: [],
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
    cols = [...cols, this.selectCol];
    this.tableConfig.sortable = false;
    this.tableConfig.archiveButton = true;
    this.tableConfig.setColumns(cols);
    this.tableConfig.setData(SharedStuff.GetData());
    this.tableConfig.onArchive = (item) => SharedStuff.onArchive(item, this.snotify);
    this.tableConfig.onCellEdit = (item, field) => {
      this.snotify.info(`Field "${field}" changed to "${item[field]}" for item with id ${item.id}`, 'Edit called');
    };
    this.service.getData().subscribe(data => {
      this.selectData = data;
      this.selectCol.withSelect.values = this.selectData;
    });
  }
}
