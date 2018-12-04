import { Injectable } from '@angular/core';
import { BehaviorSubject, of, Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class Service {
    private data = [
        {
            value: 'professional@email.com',
            text: 'Professional Email'
          },
          {
            value: 'private@email.com',
            text: 'Private Email'
          },
          {
            value: 'professional@email.com',
            text: 'Professional Email'
          },
          {
            value: 'private@email.com',
            text: 'Private Email'
          },
          {
            value: 'professional@email.com',
            text: 'Professional Email'
          },
          {
            value: 'private@email.com',
            text: 'Private Email'
          },
          {
            value: 'professional@email.com',
            text: 'Professional Email'
          },
          {
            value: 'private@email.com',
            text: 'Private Email'
          },
          {
            value: 'professional@email.com',
            text: 'Professional Email'
          },
          {
            value: 'private@email.com',
            text: 'Private Email'
          },
          {
            value: 'professional@email.com',
            text: 'Professional Email'
          },
          {
            value: 'private@email.com',
            text: 'Private Email'
          }
      ];

      private obs = of(this.data);
      public updateData(data: any[]): void {
          this.data = [...data];
      }
      public getData(): Observable<any[]> {
          return this.obs;
      }
    }
