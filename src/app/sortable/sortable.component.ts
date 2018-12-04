import { SharedStuff } from './../shared';
import { SnotifyService } from 'ng-snotify';
import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base.component';
import { PrimeTableConfig, PrimeTableColumn } from 'prime-table';

@Component({
  selector: 'app-sortable',
  templateUrl: './sortable.component.html',
  styleUrls: ['./sortable.component.css']
})
export class SortableComponent extends BaseComponent implements OnInit {
  tableConfig = new PrimeTableConfig('standard');
  infoText = 'Sort rows by column values, supports multiple levels like "parent.child.child.value"';
  constructor(protected snotify: SnotifyService) {
    super(snotify);
  }

  ngOnInit() {
    this.tableConfig.onArchive = (item) => SharedStuff.onArchive(item, this.snotify);
    this.tableConfig.orderBy = {
      key: 'child.value',
      type: 'desc'
    };
    this.tableConfig.editButton = false;
    this.tableConfig.setColumns([...SharedStuff.GetColumns(), new PrimeTableColumn('Child value', 'child.value')]);
    const sortableData = SharedStuff.GetData();
    sortableData.forEach(item => item.child = this.getChildData());
    this.tableConfig.setData(sortableData);
  }

  private getChildData = () => {
    return  { value: Math.random() * 15, id: 1};
  }

}
