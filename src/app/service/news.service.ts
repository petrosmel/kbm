import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {URL_GET_ALL_NEWS_SOURCES} from "../config/url.config";
import {IGetAllNewsSourcesResponse, ISource} from "../models/get-all-news-sources-response.interface";

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(
    private readonly http: HttpClient
  ) {
  }

  // state wannabe :)
  private _filters: string[] = [];
  userLoginSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  userLoginSubject$: Observable<boolean> = this.userLoginSubject.asObservable();

  sourcesSubject: BehaviorSubject<ISource[]> = new BehaviorSubject<ISource[]>([]);
  sourcesSubject$: Observable<ISource[]> = this.sourcesSubject.asObservable();

  userLoginLogout(isLogin: boolean = false) {
    setTimeout(() => {
        this.userLoginSubject.next(isLogin);
      },
      2000
    )
  }

  getAllNewsSources() {
    this.http.get<IGetAllNewsSourcesResponse>(URL_GET_ALL_NEWS_SOURCES).subscribe(
      (response: IGetAllNewsSourcesResponse) => {
        this.sourcesSubject.next(response?.sources);
        this._filters = this.generateFilterOptions(response?.sources);
      }
    ), (error: HttpErrorResponse) => console.log(error);
  }

  private generateFilterOptions(response: ISource[]): string[] {
    const filtersArray: string[] = [];
    response.forEach((source) => {
      filtersArray.push(source.category)
    })
    return [...new Set(filtersArray)]
  }

  getFilters(): string[] {
    return this._filters;
  }
}
