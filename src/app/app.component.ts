import { Component, OnInit } from '@angular/core';
import { SnotifyService } from 'ng-snotify';
import { PrimeTableColumn, PrimeTableConfig } from 'prime-table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private snotify: SnotifyService) { }

  tableConfigReorderableRows = new PrimeTableConfig('standard');
  tableConfigSortableRows = new PrimeTableConfig('standard');
  tableConfigExpandableRows = new PrimeTableConfig('expandable');
  tableConfigSelectableRows = new PrimeTableConfig('standard');

  ngOnInit() {
    this.tableConfigReorderableRows.archiveButton = true;
    this.tableConfigSortableRows.orderBy = {
      key: 'child.value',
      type: 'desc'
    };
    let reorderableRowColumns = this.getColumns(true);
    reorderableRowColumns = reorderableRowColumns.slice(0, reorderableRowColumns.length - 1);
    const selectCol = new PrimeTableColumn('E-mail', 'email', false, false, true, null, null);
    selectCol.withSelect = {
      label: 'text',
      values: [
        {
          value: 'emil.larsson@seb.se',
          text: 'Professional Email'
        },
        {
          value: 'larsson.emil@hotmail.com',
          text: 'Private Email'
        }
      ]
    };
    reorderableRowColumns = [...reorderableRowColumns, selectCol];
    this.tableConfigReorderableRows.setColumns(reorderableRowColumns);
    this.tableConfigReorderableRows.setData(this.getData());

    this.tableConfigSortableRows.setColumns([...this.getColumns(), new PrimeTableColumn('Child value', 'child.value')]);
    const sortableData = this.getData();
    sortableData.forEach(item => item.child = this.getChildData());
    this.tableConfigSortableRows.setData(sortableData);

    this.tableConfigExpandableRows.setColumns(this.getColumns());
    this.tableConfigExpandableRows.setData(this.getData());

    this.tableConfigSelectableRows.setColumns(this.getColumns());
    this.tableConfigSelectableRows.setData(this.getData());
    this.tableConfigSelectableRows.selectableRows = {enabled: true, buttonText: 'Choose selected', clearText: 'X'};
  }

  onAdd = (event: any) => this.snotify.success('Callback to add item called! Item ID: ' + event.id, 'add() called');
  onEdit = (event: any) => this.snotify.info('Callback to edit item called! Item ID: ' + event.id, 'edit() called');
  onArchive = (event: any) => this.snotify.warning('Callback to archive item called! Item ID: ' + event.id, 'archive() called');
  onSelected = (event: {id: number}[]) => {
    console.log(event);
    this.snotify.info('Callback to selected called! Item IDs: ' + event.map(e => e.id).join(','), 'selected() called');
  }

  private getColumns = (reorderable = false) => {
    return [
      new PrimeTableColumn<any>('Order', 'order', false, reorderable),
      new PrimeTableColumn<any>('Id', 'id'),
      new PrimeTableColumn<any>('Name', 'name', reorderable),
      new PrimeTableColumn<any>('Age', 'age', reorderable),
      new PrimeTableColumn<any>('E-mail', 'email', reorderable)
    ];
  }

  private getData = (): any[] => {
    return [
      {id: 2, order: 1, name: 'Emil Larsson', age: 24, email: 'emil.larsson@seb.se'},
      {id: 3, order: 2, name: 'Jan Lövgren', age: 46, email: 'jan.lovgren@seb.se'},
      {id: 6, order: 5, name: 'Fredrik Lundberg', age: 43, email: 'fredrik.lundberg@seb.se'},
      {id: 1, order: 4, name: 'Christian Bleckert', age: 41, email: 'christian.bleckert@seb.se'},
      {id: 4, order: 3, name: 'Joel Forsgren', age: 34, email: 'joel.forsgren@seb.se'},
      {id: 5, order: 6, name: 'Unknown User', age: 0, email: 'name@example.com'}
    ];
  }

  private getChildData = () => {
    return  { value: Math.random() * 15, id: 1};
  }
}
