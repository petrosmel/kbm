import {Component, Output, EventEmitter, OnInit} from '@angular/core';
import {NewsService} from "../../../service/news.service";
import {FormControl} from "@angular/forms";
import {BaseComponent} from "../../shared/base/base.component";
import {takeUntil} from "rxjs";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
})
export class PaginationComponent extends BaseComponent implements OnInit {
  @Output() pageChanged: EventEmitter<number> = new EventEmitter<number>();

  paginationInputControl = new FormControl<number>(1);
  totalPaginationPages: number = 1;
  inputSize = this.totalPaginationPages.toString().length;
  currentPage: number = 1;

  constructor(private readonly newsService: NewsService) {
    super();
  }

  ngOnInit() {
    this.newsService.paginationTotalPagesSubject$
      .pipe(takeUntil(this.destroyed))
      .subscribe(totalPages => this.totalPaginationPages = Number(totalPages))
  }

  onNextPageClicked(): void {
    if (this.currentPage + 1 > this.totalPaginationPages) {
      this.setPage(this.totalPaginationPages);
    } else {
      this.setPage(this.currentPage += 1);
    }
  }

  onPreviousPageClicked(): void {
    if (this.currentPage - 1 < 1) {
      this.setPage(1);
    } else {
      this.setPage(this.currentPage -= 1);
    }
  }

  onInputBlur(event: Event) {
    const page: number = this.validateInputValue(+(event.target as HTMLInputElement).value);
    this.setPage(page);
  }

  onFirstPageClicked() {
    this.setPage(1);
  }

  onLastPageClicked() {
    this.setPage(this.totalPaginationPages);
  }

  private setPage(page: number) {
    this.currentPage = page;
    this.paginationInputControl.setValue(page);
    this.pageChanged.emit(page);
  }

  private validateInputValue(value: number): number {
    if (value < 1) {
      return 1;
    }
    if (value > this.totalPaginationPages) {
      return this.totalPaginationPages;
    }
    if (isNaN(value) || !Number.isInteger(value)) {
      return this.currentPage;
    }
    return value;
  }
}
