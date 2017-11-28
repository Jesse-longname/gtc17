import { Component, OnInit, HostListener } from '@angular/core';
import { Store } from '@ngrx/store';
import { IFeedItem } from '../../models/feed';

@Component({
  selector: 'gtc-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  feedList: IFeedItem[] = [];
  displayList: IFeedItem[] = [];
  isNewPostVisible: boolean = false;

  constructor(private store: Store<any>) {
    this.store.select('feed').subscribe(data => {
      this.feedList = data;
      this.showNextTen();
      this.updateDisplayList();
    });
  }

  updateDisplayList() {
    if (this.feedList[0] != this.displayList[0])
      this.displayList.unshift(this.feedList[0]);
  }
  showNextTen() {
    let index = this.displayList.length;
    for (let i = index; i < index + 10; i++) {
      if (this.feedList[i])
        this.displayList.push(this.feedList[i]);
    }
  }

  @HostListener("window:scroll", [])
  onScroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      // you're at the bottom of the page
      this.showNextTen();
    }
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
