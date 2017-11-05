import { Component, OnInit, Input } from '@angular/core';
import { IFeedItem } from '../../../models/feed';

@Component({
  selector: 'gtc-feed-item',
  templateUrl: './feed-item.component.html',
  styleUrls: ['./feed-item.component.scss']
})
export class FeedItemComponent implements OnInit {
  @Input() data: IFeedItem;

  constructor() {

  }

  ngOnInit() {
  }

}
