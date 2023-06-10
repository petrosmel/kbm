import {Component, OnDestroy} from '@angular/core';
import {Subject} from "rxjs";

@Component({selector: 'base', template:``})
export class BaseComponent implements OnDestroy {
  destroyed: Subject<boolean> = new Subject<boolean>();

  ngOnDestroy() {
    this.destroyed.next(true);
    this.destroyed.complete();
  }
}
