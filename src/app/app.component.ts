import {Component, OnInit} from '@angular/core';
import {NewsService} from "./service/news.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private readonly newsService: NewsService) {
  }

  ngOnInit() {
    this.fetchSources();
  }

  private fetchSources() {
    this.newsService.getAllNewsSources()
  }
}
