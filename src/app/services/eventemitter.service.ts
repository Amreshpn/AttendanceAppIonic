import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class EventemitterService {
  private mysocket = new Subject<any>();

  publish(data: string) {
    this.mysocket.next(data);
  }

  getObservable(): Subject<any> {
      return this.mysocket;
  }
  constructor() { }
}
