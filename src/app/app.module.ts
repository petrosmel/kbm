import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoadingIndicatorComponent } from './components/shared/loading-indicator/loading-indicator.component';
import { BaseComponent } from './components/shared/base/base.component';
import { ErrorIndicatorComponent } from './components/shared/error-indicator/error-indicator.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './components/main/main.component';
import { HeroComponent } from './components/header/hero/hero.component';
import { UserBarComponent } from './components/header/user-bar/user-bar.component';
import { SearchComponent } from './components/main/search/search.component';
import { FiltersComponent } from './components/main/filters/filters.component';
import { CardComponent } from './components/main/card/card.component';
import { PaginationComponent } from './components/main/pagination/pagination.component';

@NgModule({
  declarations: [
    AppComponent,
    LoadingIndicatorComponent,
    BaseComponent,
    ErrorIndicatorComponent,
    FooterComponent,
    HeaderComponent,
    MainComponent,
    HeroComponent,
    UserBarComponent,
    SearchComponent,
    FiltersComponent,
    CardComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
