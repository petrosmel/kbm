import {Component, Input} from '@angular/core';
import {ISource} from "../../../models/get-all-news-sources-response.interface";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() inputSource: ISource | undefined;
}
