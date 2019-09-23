import { SnotifyService } from 'ng-snotify';
import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base.component';
import { SharedStuff } from '../shared';
import { PrimeTableConfig } from 'projects/prime-table/src/public_api';

@Component({
  selector: 'app-selectable',
  templateUrl: './selectable.component.html',
  styleUrls: ['./selectable.component.css']
})
export class SelectableComponent extends BaseComponent implements OnInit {
  tableConfig = new PrimeTableConfig('standard');
  infoText = 'Select rows and emit selected rows in output event via button click event';
  constructor(
    protected snotify: SnotifyService
  ) {
    super(snotify);
  }

  ngOnInit() {
    this.tableConfig.onArchive = (item) => SharedStuff.onArchive(item, this.snotify);
    this.tableConfig.sortable = false;
    this.tableConfig.editButton = false;
    this.tableConfig.filters = true;
    this.tableConfig.setColumns(SharedStuff.GetColumns());
    this.tableConfig.setData(SharedStuff.GetData());
    this.tableConfig.selectableRows = {enabled: true, multiple: true, buttonText: 'Choose selected', clearText: 'X'};
  }
}
