import {Component} from '@angular/core';
import {BaseComponent} from "../shared/base/base.component";
import {NewsService} from "../../service/news.service";
import {Observable, of} from "rxjs";
import {ISource} from "../../models/get-all-news-sources-response.interface";

interface Oninit {
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent extends BaseComponent implements Oninit {
  sourcesSubject$: Observable<ISource[]> = this.newsService.sourcesSubject$;
  cardsDataList$: Observable<ISource[]> = of([]);

  constructor(
    private readonly newsService: NewsService
  ) {
    super();
  }

  ngOnInit() {
    this.setInitialValue();
  }

  private setInitialValue() {
    this.cardsDataList$ = this.sourcesSubject$;
  }

  trackByFn(index: number) {
    return index;
  }

  showFilteredList(input: ISource[] | null) {
    if (input) {
      this.cardsDataList$ = of(input)
    } else {
      this.cardsDataList$ = this.sourcesSubject$;
    }
  }

  filterByCategory(input: string | null) {
    let filteredArray: ISource[] = []
    if (input) {
      const sources: ISource[] = this.newsService.sourcesSubject.getValue();
      filteredArray = sources.filter(source => source.category.toLowerCase() === (String(input?.toLowerCase())));
    } else {
    }
  }
}
