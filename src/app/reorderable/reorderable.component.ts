import { SharedStuff } from './../shared';
import { Component, OnInit } from '@angular/core';
import { PrimeTableConfig, PrimeTableColumn } from 'prime-table';
import { BaseComponent } from '../base.component';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-reorderable',
  templateUrl: './reorderable.component.html',
  styleUrls: ['./reorderable.component.css']
})
export class ReorderableComponent extends BaseComponent implements OnInit {
  tableConfig = new PrimeTableConfig('standard');
  infoText = 'Reorder rows using the reorderable property';
  constructor(protected snotify: SnotifyService) {
    super(snotify);
  }

  ngOnInit() {
    this.tableConfig.onArchive = (item) => SharedStuff.onArchive(item, this.snotify);
    this.tableConfig.sortable = false;
    this.tableConfig.editButton = false;
    const cols = SharedStuff.GetColumns();
    cols[0].reorderable = true;
    this.tableConfig.setColumns(SharedStuff.GetColumns());
    this.tableConfig.setData(SharedStuff.GetData());
  }

}
