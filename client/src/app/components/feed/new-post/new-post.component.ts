import { Component, Output, EventEmitter } from '@angular/core';
import { FeedItem } from '../../../models/feed';
import { IUser, User } from '../../../models/user';
import { problemOptions, howItWentOptions } from '../../../models/feed';
import { Store } from '@ngrx/store';
import * as moment from 'moment';


@Component({
  selector: 'gtc-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent {
  @Output() onAddPost: EventEmitter<any> = new EventEmitter();
  problemOptions = problemOptions;
  howItWentOptions = howItWentOptions;
  user: IUser;

  //Form Data
  whatHappened: string = null;
  howItWent: string = null;
  whatWasTheProblem: string = null;

  constructor(private store: Store<any>) {
    this.store.select('user').subscribe(data => {
      this.user = data;
    });
  }

  onAddPostClick() {
    this.onAddPost.emit(new FeedItem(
      this.user,
      this.whatHappened,
      this.howItWent,
      this.whatWasTheProblem,
      moment(new Date()).format('ll'),
    ));
    this.whatHappened = null;
    this.howItWent = null;
    this.whatWasTheProblem = null;
  }
}
