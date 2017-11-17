import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IFeedItem } from '../../models/feed';

@Component({
  selector: 'gtc-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  feedList: IFeedItem[] = [];
  isNewPostVisible: boolean = false;

  constructor(private store: Store<any>) {
    this.store.select('feed').subscribe(data => {
      this.feedList = data;
    });
  }

  hideNewPost() {
    this.isNewPostVisible = false;
  }

  showNewPost() {
    this.isNewPostVisible = true;
  }

  ngOnInit() {
  }

  addNewItem(item: IFeedItem) {
    this.isNewPostVisible = false;
    console.log(this.isNewPostVisible);
    this.store.dispatch({
      type: 'ADD_FEED_ITEM',
      payload: item
    });
  }


}
