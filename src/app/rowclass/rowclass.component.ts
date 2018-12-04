import { BaseComponent } from './../base.component';
import { Component, OnInit } from '@angular/core';
import { SharedStuff } from '../shared';
import { PrimeTableConfig } from 'prime-table';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-rowclass',
  templateUrl: './rowclass.component.html',
  styleUrls: ['./rowclass.component.css']
})
export class RowclassComponent extends BaseComponent implements OnInit {
  tableConfig = new PrimeTableConfig('standard');
  infoText =
    'Use custom row/column classes based on row/column values. Here, all odd rows are green and all columns with "age" > 40 are white';
  constructor(protected snotify: SnotifyService) {
    super(snotify);
  }

  ngOnInit() {
    this.tableConfig.onArchive = (item) => SharedStuff.onArchive(item, this.snotify);
    this.tableConfig.sortable = false;
    const cols = SharedStuff.GetColumns();
    cols.forEach(col => {
      col.extraClass = (row) => {
        if (col.name === 'name' && row.id % 2 === 0) {
          return 'bg-success';
        } else if (col.name === 'age' && row[col.name] > 40) {
          return 'bg-light';
        }
        return null;
      };
      return col;
    });
    this.tableConfig.editButton = false;
    this.tableConfig.setColumns(cols);
    this.tableConfig.setData(SharedStuff.GetData());
    this.tableConfig.rowClasses = {
      'bg-danger': (row: any) => row.id % 2 === 0,
      'bg-info': (row: any) => row.id % 2 === 1
    };
  }

}
