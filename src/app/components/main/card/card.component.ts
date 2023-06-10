import {Component, Input} from '@angular/core';
import {IArticle} from "../../../models/get-all-news-response.models";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() article: IArticle | undefined;
}
