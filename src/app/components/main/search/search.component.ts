import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {BaseComponent} from "../../shared/base/base.component";
import {debounceTime, takeUntil} from "rxjs";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent extends BaseComponent implements OnInit {
  searchControl = new FormControl<string | null>("");

  constructor() {
    super();
  }

  ngOnInit() {
    this.subscribeToValueChanges();
  }

  private subscribeToValueChanges() {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        takeUntil(this.destroyed))
      .subscribe()
  }
}
