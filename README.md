

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

### PrimeTableConfig object

> Documentation still to be written... Basically a bunch of booleans determining different functionality for the table.

|Property|Usage|
|--|--|
|x|y|

### PrimeTableColumn object
> Documentation still to be written... Basically a bunch of booleans determining different functionality for each individual column in the table.

|Property|Usage|
|--|--|
|x|y|