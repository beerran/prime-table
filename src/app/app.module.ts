import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PrimeTableModule } from 'prime-table';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PrimeTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
