

# PrimeTable
[![npm](https://img.shields.io/npm/v/prime-table.svg)](https://www.npmjs.com/package/prime-table)
[![Build Status](https://travis-ci.com/beerran/prime-table.svg?branch=master)](https://travis-ci.com/beerran/prime-table)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com/)

### [View example](https://beerran.github.io/prime-table/)

## Dependencies
* [PrimeNG](https://github.com/primefaces/primeng) - Contains components wrapped in this library
	* `npm i primeng primeicons --save`
* [Bootstrap](https://github.com/twbs/bootstrap) - Base styling
	* `npm i bootstrap --save`
* [FontAwesome](https://github.com/FortAwesome/Font-Awesome) - Additional icons used instead of PrimeNG defaults
	* `npm i @fortawesome/fontawesome-free --save`
* **All dependencies:** 
	* `npm i primeng primeicons bootstrap @fortawesome/fontawesome-free --save`

## Installation
Install with:

    npm install prime-table --save

Include styles in build;

    ...
    	"styles": [
    		"node_modules/prime-table/scss/prime-table-styles.scss",
    		"src/styles.scss"
    	],
    ...

or in own .scss-file:

    @import  '~node_modules/prime-table/scss/prime-table-styles';

Import BrowserAnimationsModule and PrimeTableModule in your App.Module:

    import { BrowserModule } from '@angular/platform-browser';
    import { NgModule } from '@angular/core';
    import { AppComponent } from './app.component';
    import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
    import { PrimeTableModule } from 'prime-table';
    
    @NgModule({
      declarations: [
        AppComponent
      ],
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        PrimeTableModule
      ],
      providers: [],
      bootstrap: [AppComponent]
    })
    export class AppModule { }


## Usage
Use the template selector `<prime-table></prime-table>` where you want to display your table.

### Inputs:
|Name|Usage|
|--|--|
|columns|Column configuration for current table|
|data|Data for current table. Array of objects. Each object needs to have the properties defined in "columns"|
|config|Combined columns and data-input, taking a a single PrimeTableConfig as input, containing all configuration needed|


### Outputs:
|Name|Usage|
|--|--|
|add()|If addButton is set to true in your config object, an Add New-button will appear. When clicked, this event is emitted|
|edit()|If editButton is set to true in your config object, each row in the table will receive an additional column with an edit button. When clicked, this event is emitted where $event is the clicked item in the data array|
|archive()|If archiveButton is set to true in your config object, each row in the table will receive an additional column with an archive button. When clicked, this event is emitted where $event is the clicked item in the data array|
|selected()|If selectableRows.enabled is set to true, each selected row will get inserted into an array and emitted when this event is called. Emitted via button in table header

### PrimeTableConfig object

#### Constructor
The constructor takes a preset string, doing some configuration for you.
Possible values are:

    'none' | 'easy' | 'standard' | 'drilldown' | 'format' | 'expandable'

#### Configuration properties
|Property|Usage (default)|
|--|--|
|data: any[] or TreeNode[] | List of items to populate table
|columns: PrimeTableColumn[] | List of column configurations. Set this property via the setColumns method
|drilldown: boolean | (false) data has multiple levels
|rowCount: boolean | (true) show pagination and row count selector
|rowsShown: number | (null) number of rows to show, null shows all
| filters: boolean | (true) show filter button with search input
| export: boolean | (true) export button to export CSV data (does not work well with child properties as of yet)
| sortable: boolean | (true) if sorting columns asc/desc should be enabled
| scrollable: boolean | (false) if table should be scrollable with a set height
| addButton: boolean | (false) if an add button should be visible. Triggers event add() when clicked
| editButton: boolean | (false) if an edit button should be visible for each row. Triggers event edit($event) when clicked where $event is the row
| archiveButton: boolean | (false) if an archive button should be visible for each row. Triggers event archive($event) when clicked where $event is the row
| responsive: boolean | (true) if table should be responsible
| autoLayout: boolean | (true) auto-size column widths
| size: 'sm', 'md', 'lg' | ('md') size of table
| tooltip: string | (null) tooltip on row hover. Set this to property name of row data to show in tooltip
| drilldownProperty: string | (null) which property contains drilldown data

#### PrimeTableConfig Methods
    setDrilldownProperty(propertyName: string): void
Sets the drilldown property for the table

    clear(): void
Unsets all table data

    setColumns(cols: PrimeTableColumn<any>[]): void
Sets column configuration for the table. This is the preferred way to set columns, not via the "columns" property

    setData(data: any[]): void
Set table data

    setTreeData(data: any[]): void
Set drilldown data. Will map data based on the drilldownProperty set, so call this method only after drilldownProperty has been set

    disable(properties: string[]): void
List of properties to set to false

    enable(properties: string[]): void
List of properties to set to true

#### PrimeTableConfig Object inputs
Some input properties are objects with properties themselves

##### OrderBy
    orderBy: {
        key: string,
        type: 'asc' | 'desc'
    }
Where key is the row property to order by, and type if it should order ascending or descending.

The key can be a child property, e.g. "row.child_item.grandchild_item.property"

##### Expandable
    expandable: {
        key: string,
        enabled: boolean
    }
Where key is an unique identifier for the row.
If used, the template syntax will look like this:

    <b-prime-table [config]="tableConfig">
        <ng-template let-expanded="expandedRow">
            This is data from my expanded row! {{expanded.property}}
        </ng-template>
    </b-prime-table>

##### ColumnSettings
    columnSettings: {
        resizable: boolean,
        selectable: boolean
    }
Customize if columns should be resizable and selectable (no functionality introduced for selectable rows as of yet)

##### Menu
    menu: {
        enabled: boolean,
        node: null,
        items: []
    }
Where node is the row (any | TreeNode) for which to show a list of items (MenuItem[] from primeng/api). When clicked, do an event based on node data. Examples will come

##### SelectableRows
    selectableRows: {
        enabled: boolean,
        buttonText: string
    }
Where buttonText is the text of the button in the top right corner of the table. The button will in turn emit the "selected" event, with the selected rows as event data.

### PrimeTableColumn object
| Property | Usage (default) |
|--|--|
| displayName: string | (required) Label to show in column header 
| name: string | (required) Property to get data from. Can be child property, e.g. "item.child.property"
| editable: boolean | (false) Enable/disable inline editing for column
| reorderable: boolean | (false) If this column should be used as identifer for reordering rows
| visible: boolean | (true) Hide/show column
| render: (row: T) => any | (null) Custom render function for outputting different value
| extraClass: (row: T) => any | (null) Custom function for adding classes to column based on external circumstances
| values: any[] | (null) If column is editable and should have a select box, these are the values in said select box
| hasSelect: boolean | (false) If editable and has a select box
| [key: string]: any | Extra properties for column
| withLink: PrimeTableColumnLink | If column has an anchor link