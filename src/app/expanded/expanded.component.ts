import { SnotifyService } from 'ng-snotify';
import { Component, OnInit } from '@angular/core';
import { SharedStuff } from '../shared';
import { PrimeTableConfig } from 'prime-table';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'app-expanded',
  templateUrl: './expanded.component.html',
  styleUrls: ['./expanded.component.css']
})
export class ExpandedComponent extends BaseComponent implements OnInit {
  tableConfig = new PrimeTableConfig('expandable');
  infoText = 'Expand rows easily with your own content using ng-template';
  constructor(protected snotify: SnotifyService) {
    super(snotify);
  }

  ngOnInit() {
    this.tableConfig.onArchive = (item) => SharedStuff.onArchive(item, this.snotify);
    this.tableConfig.sortable = false;
    this.tableConfig.editButton = false;
    this.tableConfig.menu = {
      enabled: true,
      items: [
          {
            label: 'Menu item', icon: 'fa fa-plus', command: (event) => console.log(event)
          }
      ],
      node: null
    };
    this.tableConfig.setColumns(SharedStuff.GetColumns());
    this.tableConfig.setData(SharedStuff.GetData());
  }
}
