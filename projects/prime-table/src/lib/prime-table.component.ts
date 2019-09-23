import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import { SelectItem, TreeNode } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';

import { PrimeTableColumn } from './models/prime-table-column';
import { PrimeTableConfig } from './models/prime-table-config';

@Component({
  selector: 'b-prime-table',
  templateUrl: './prime-table.component.html',
  styles: []
})
export class PrimeTableComponent implements OnInit {
  @ContentChild(TemplateRef)
  @Input() expandedTemplate: TemplateRef<any>;

  public _config = new PrimeTableConfig('standard');
  public dataLoaded = new BehaviorSubject<boolean>(false);
  public showFilters = false;
  public hasReorderableColumn = false;
  public rowCount: {options: SelectItem[], selected: number} = {
    options: [
      {label: 'All', value: null},
      {label: '5', value: 5},
      {label: '10', value: 10},
      {label: '25', value: 25},
      {label: '50', value: 50},
      {label: '100', value: 100}
    ],
    selected: null
  };
  public selectedColumns: any[];
  public selectedRows: any[];

  public screenHeight = '0px';

  public cm: any; // Placeholder for contextmenu

  private columnsLoaded = new BehaviorSubject<boolean>(false);

  @Input('config')
  set config(input: PrimeTableConfig) {
    if (input) {
      this._config = input;
      this.setupColumns();
      this.setupData();
      this.rowCount.selected = this._config.rowsShown;
    }
  }

  @Input('data')
  set data(data: any[] | TreeNode[]) {
    if (data) {
      this._config.drilldown ? this._config.setTreeData(data) : this._config.setData(data);
      this.setupData();
    }
  }

  @Input('columns')
  set columns(columns: PrimeTableColumn<any>[]) {
    this._config.setColumns(columns);
    this.setupColumns();
  }

  @Output() add = new EventEmitter<any>();
  @Output() edit = new EventEmitter<any>();
  @Output() selected = new EventEmitter<any>();

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.screenHeight = (window.innerHeight - 350) + 'px';
  }

  constructor() {
    this.onResize();
  }

  onSelectedEmit(rows: any[]): void {
    this.selected.emit(rows);
    this.selectedRows = [];
  }

  ngOnInit() {
      // ToDo: Fix for drilldown tables
      this.dataLoaded.subscribe(dataLoaded => {
        if (dataLoaded) {
          if (this.hasReorderableColumn) {
            const reorderableColumn = this._config.columns.find(col => col.reorderable === true);
            this._config.sortable = false;
            (this._config.data as any[]).sort((first, second) => first[reorderableColumn.name] - second[reorderableColumn.name]);
          }
        }
      });
  }

  doArchive(row: any) {
    if (this._config.onArchive) {
      this._config.onArchive(row);
    }
  }

  doSave(event: any) {
    if (this._config.onCellEdit) {
      this._config.onCellEdit(event.data.row, event.field);
    }
  }

  private setupData() {
    this.dataLoaded.next(true);
  }

  getClasses(row: any) {
    const obj: {
      [key: string]: boolean
    } = {};
    Object.keys(this._config.rowClasses).forEach(key => {
      obj[key] = this._config.rowClasses[key](row);
    });
    return obj;
  }

  private setupColumns() {
    this.selectedColumns = this._config.columns.filter(col => col.visible !== false);
    this.hasReorderableColumn = this._config.columns.findIndex(col => col.reorderable === true) >= 0;
    this._config.columns.forEach(col => col.hasSelect = col.values && col.values.length > 1);
    this.columnsLoaded.next(true);
  }

  rowReordered = (event: {dragIndex: number, dropIndex: number}) => {
    if (event.dropIndex >= event.dragIndex) {
      // Bug in PrimeNg, when dragging up/"on top" of another row it gets the wrong index
      event.dropIndex--;
    }
    const reorderableColumn = this._config.columns.find(col => col.reorderable === true);
    this._config.data[event.dropIndex][reorderableColumn.name] = event.dropIndex + 1;
    if (event.dropIndex > event.dragIndex) {
      for (let i = event.dragIndex; i < event.dropIndex; i++) {
        this._config.data[i][reorderableColumn.name] = i + 1;
      }
    } else {
      for (let i = event.dropIndex; i <= event.dragIndex; i++) {
        this._config.data[i][reorderableColumn.name] = i + 1;
      }
    }
  }

  toggleFilters = () => this.showFilters = !this.showFilters;

  getCellValue(row: any, col: PrimeTableColumn<any>) {
    if (col.render) {
      return col.render(row);
    } else {
      try {
        const resolvedValue = this.resolveKey(col.name, row);
        if (resolvedValue === null || resolvedValue === undefined || resolvedValue === '') {
          return col.defaultValue || '-';
        }
        return resolvedValue;
      } catch {
        return col.defaultValue || '-';
      }
    }
  }

  getLinkValue(row: any, col: PrimeTableColumn<any>) {
    const dynamicPath = col.withLink.dynamic ? '/' + this.resolveKey(col.withLink.dynamic, row) : '';
    return col.withLink.staticPath + dynamicPath;
  }

  private resolveKey = (key: string, obj: any): any => {
    return key.split('.').reduce((prev: any, curr: any) => prev ? prev[curr] : null , obj);
  }
}
