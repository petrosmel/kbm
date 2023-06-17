import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {URL_GET_ALL_NEWS_SOURCES} from "../config/url.config";
import {IGetAllNewsSourcesResponse, ISource} from "../models/get-all-news-sources-response.interface";
import {ICallStatus} from "../models/call-status.model";

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(
    private readonly http: HttpClient
  ) {
  }

  private _filters: string[] = [];
  private _totalPaginationPages: number = 0;
  private _initialSourcesArray: ISource[] | null = [];
  userLoginSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  userLoginSubject$: Observable<boolean> = this.userLoginSubject.asObservable();
  userLoginLoaderSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  userLoginLoaderSubject$: Observable<boolean> = this.userLoginLoaderSubject.asObservable();

  sourcesSubject: BehaviorSubject<ISource[] | null> = new BehaviorSubject<ISource[] | null>([]);
  sourcesSubject$: Observable<ISource[] | null> = this.sourcesSubject.asObservable();
  sourcesCallStatusSubject: BehaviorSubject<ICallStatus> = new BehaviorSubject<ICallStatus>({
    success: false,
    loading: false,
    error: false,
  });
  sourcesCallStatusSubject$: Observable<ICallStatus> = this.sourcesCallStatusSubject.asObservable();

  paginationElementsPerPage: number = 6;
  paginationTotalPagesSubject: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(1);
  paginationTotalPagesSubject$: Observable<number | null> = this.paginationTotalPagesSubject.asObservable();


  userLoginLogout(isLogin: boolean = false) {
    this.userLoginLoaderSubject.next(true);
    setTimeout(() => {
        this.userLoginSubject.next(isLogin);
        this.userLoginLoaderSubject.next(false);
      },
      2000
    )
  }

  getAllNewsSources() {
    this.sourcesCallStatusSubject.next({
      success: false,
      loading: true,
      error: false,
    });
    this.http.get<IGetAllNewsSourcesResponse>(URL_GET_ALL_NEWS_SOURCES).subscribe(
      (response: IGetAllNewsSourcesResponse) => {
        this._initialSourcesArray = response?.sources;
        this.sourcesSubject.next(this._initialSourcesArray);
        this._filters = this.generateFilterOptions(response?.sources);
        this.handlePagination(response?.sources?.length);
        this.sourcesCallStatusSubject.next({
          success: true,
          loading: false,
          error: false,
        });

      }
    ), (error: HttpErrorResponse) => {
      console.log(error);
      this.sourcesCallStatusSubject.next({
        success: false,
        loading: false,
        error: true,
      });
    };
  }

  updateSourcesSubject(listOfSources: ISource[]) {
    this.sourcesSubject.next(listOfSources);
    this.handlePagination(listOfSources.length);
  }

  setInitialSourcesArray() {
    this.sourcesSubject.next(this._initialSourcesArray);
    this.handlePagination((this._initialSourcesArray as ISource[]).length);
  }

  getFilters(): string[] {
    return this._filters;
  }

  getInitialSourcesArray(): ISource[] | null {
    return this._initialSourcesArray as ISource[];
  }


  private handlePagination(amountOfSources: number) {
    this._totalPaginationPages = Math.ceil(amountOfSources / this.paginationElementsPerPage);
    this.paginationTotalPagesSubject.next(this._totalPaginationPages);
  }

  private generateFilterOptions(response: ISource[]): string[] {
    const filtersArray: string[] = [];
    response.forEach((source) => {
      filtersArray.push(source.category.toUpperCase())
    })
    return [...new Set(filtersArray)].sort();
  }
}
