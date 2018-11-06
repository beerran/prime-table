import { Component, OnInit } from '@angular/core';
import { SnotifyService } from 'ng-snotify';

import { ROUTES } from './app.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private snotify: SnotifyService) { }
  menu = ROUTES;
  ngOnInit() {
  }

}
