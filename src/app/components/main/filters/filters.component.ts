import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {debounceTime, takeUntil} from "rxjs";
import {BaseComponent} from "../../shared/base/base.component";
import {FormControl} from "@angular/forms";
import {NewsService} from "../../../service/news.service";

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
})
export class FiltersComponent extends BaseComponent implements OnInit {
  @Output() filterSelected = new EventEmitter<string>();
  filterControl = new FormControl('Choose Category');
  filters: string[] = []
  selectedFilter: string = "";
  dropdownPlaceholder: string = "Choose Category";

  constructor(private readonly newsService: NewsService) {
    super();
  }

  ngOnInit() {
    this.getFilters();
    this.subscribeToValueChanges();
  }

  private subscribeToValueChanges() {
    this.filterControl.valueChanges
      .pipe(
        debounceTime(300),
        takeUntil(this.destroyed))
      .subscribe((userInput: string | null) => {
        const value: string | null = userInput !== this.dropdownPlaceholder ? String(userInput) : "";
        this.selectedFilter = value;
        this.filterSelected.emit(value)
      })
  }

  private getFilters() {
    this.filters = this.newsService.getFilters();
  }
}
