import {Component, OnInit} from '@angular/core';
import {debounceTime, takeUntil} from "rxjs";
import {BaseComponent} from "../../shared/base/base.component";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent extends BaseComponent implements OnInit {
  filtersControl = new FormControl<string | null>("");

  ngOnInit() {
    this.subscribeToValueChanges();
  }

  private subscribeToValueChanges() {
    this.filtersControl.valueChanges
      .pipe(
        debounceTime(300),
        takeUntil(this.destroyed))
      .subscribe()
  }
}
