import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl} from "@angular/forms";
import {BaseComponent} from "../../shared/base/base.component";
import {debounceTime, filter, takeUntil} from "rxjs";
import {NewsService} from "../../../service/news.service";
import {ISource} from "../../../models/get-all-news-sources-response.interface";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent extends BaseComponent implements OnInit {
  @Output() onSearchTriggered = new EventEmitter<ISource[] | null>();
  searchControl = new FormControl<string | null>("");

  constructor(
    private readonly newsService: NewsService
  ) {
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
      .subscribe((userInput: string | null) => {
        const sources = this.newsService.sourcesSubject.getValue();
        if (userInput) {
          this.onSearchTriggered.emit(sources.filter(source => source.name.toLowerCase().includes(String(userInput?.toLowerCase()))))
        } else {
          this.onSearchTriggered.emit(null)
        }
      })
  }
}
