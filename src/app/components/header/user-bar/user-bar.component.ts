import {Component, Input} from '@angular/core';
import {IUser} from "../../../models/user.model";
import {NewsService} from "../../../service/news.service";

@Component({
  selector: 'app-user-bar',
  templateUrl: './user-bar.component.html',
  styleUrls: ['./user-bar.component.css']
})
export class UserBarComponent {
  userLoginSubject$ = this.newsService.userLoginSubject$;
  userLoginLoaderSubject$ = this.newsService.userLoginLoaderSubject$;

  constructor(
    private readonly newsService: NewsService
  ) {}

  @Input() user: IUser = {firstname: "Random", lastname: "User"};

  userLoginLogout(isLogin: boolean = false) {
    this.newsService.userLoginLogout(isLogin);
  }
}
