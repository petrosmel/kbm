import {Component} from '@angular/core';
import {BaseComponent} from "../shared/base/base.component";
import {NewsService} from "../../service/news.service";
import {Observable} from "rxjs";
import {ISource} from "../../models/get-all-news-sources-response.interface";
import {ICallStatus} from "../../models/call-status.model";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html'
})
export class MainComponent extends BaseComponent {
  sourcesSubject$: Observable<ISource[] | null> = this.newsService.sourcesSubject$;
  sourcesCallStatusSubject$: Observable<ICallStatus> = this.newsService.sourcesCallStatusSubject$;
  activePage: number = 1;
  elementsPerPage: number = this.newsService.paginationElementsPerPage;
  skeletonArray = new Array(3);

  constructor(
    private readonly newsService: NewsService
  ) {
    super();
  }


  trackByFn(index: number) {
    return index;
  }

  showFilteredList(input: ISource[] | null) {
    if (input) {
      this.newsService.updateSourcesSubject(input);
    } else {
      this.newsService.setInitialSourcesArray();
    }
  }

  filterByCategory(input: string | null) {
    let filteredArray: ISource[] = []
    if (input) {
      const sources: ISource[] | null = this.newsService.getInitialSourcesArray();
      filteredArray = (sources as ISource[]).filter(source => source.category.toLowerCase() === (String(input?.toLowerCase())));
      this.newsService.updateSourcesSubject(filteredArray);
    } else {
      this.newsService.setInitialSourcesArray();
    }
  }

  onPageChanged(page: number) {
    this.activePage = page
  }
}
