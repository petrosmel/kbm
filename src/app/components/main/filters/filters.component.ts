import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {debounceTime, takeUntil} from "rxjs";
import {BaseComponent} from "../../shared/base/base.component";
import {FormControl} from "@angular/forms";
import {NewsService} from "../../../service/news.service";

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent extends BaseComponent implements OnInit {
  @Output() onFilterSelected = new EventEmitter<string>();
  filtersControl = new FormControl<string | null>("");
  filters: string[] = []

  constructor(private readonly newsService: NewsService) {
    super();
  }

  ngOnInit() {
    this.getFilters();
    this.subscribeToValueChanges();
  }

  private getFilters() {
    this.filters = this.newsService.getFilters();
  }

  private subscribeToValueChanges() {
    this.filtersControl.valueChanges
      .pipe(
        debounceTime(300),
        takeUntil(this.destroyed))
      .subscribe()
  }

  filterSelected(input: string | null) {
    this.onFilterSelected.emit(String(input))
  }
}
