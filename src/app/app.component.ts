import { PrimeTableConfig } from './../../projects/prime-table/src/lib/models/prime-table-config';
import { Component, OnInit } from '@angular/core';
import { PrimeTableColumn } from 'prime-table';
import { SnotifyService } from 'ng-snotify';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private snotify: SnotifyService) { }

  tableConfig = new PrimeTableConfig('standard');

  ngOnInit() {
    this.tableConfig.archiveButton = true;
    this.tableConfig.setColumns([
      new PrimeTableColumn('Order', 'order', false, true),
      new PrimeTableColumn('Id', 'id'),
      new PrimeTableColumn('Name', 'name', true),
      new PrimeTableColumn('Age', 'age', true),
      new PrimeTableColumn('E-mail', 'email', true)
    ]);

    this.tableConfig.setData([
      {id: 2, order: 1, name: 'Emil Larsson', age: 24, email: 'emil.larsson@seb.se'},
      {id: 3, order: 2, name: 'Jan Lövgren', age: 46, email: 'jan.lovgren@seb.se'},
      {id: 6, order: 5, name: 'Fredrik Lundberg', age: 43, email: 'fredrik.lundberg@seb.se'},
      {id: 1, order: 4, name: 'Christian Bleckert', age: 41, email: 'christian.bleckert@seb.se'},
      {id: 4, order: 3, name: 'Joel Forsgren', age: 34, email: 'joel.forsgren@seb.se'},
      {id: 5, order: 6, name: 'Unknown User', age: 0, email: 'name@example.com'}
    ]);
  }

  onAdd = (event: any) => this.snotify.success('Callback to add item called! Item ID: ' + event.id, 'add() called');
  onEdit = (event: any) => this.snotify.info('Callback to edit item called! Item ID: ' + event.id, 'edit() called');
  onArchive = (event: any) => this.snotify.warning('Callback to archive item called! Item ID: ' + event.id, 'archive() called');
}
