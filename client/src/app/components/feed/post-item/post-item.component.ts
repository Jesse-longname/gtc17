import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Post } from '../../../models/post';

@Component({
  selector: 'gtc-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss']
})
export class PostItemComponent implements OnInit {
  @Input() post: Post;
  @Output() onCommentClick = new EventEmitter<void>();
  profileVisible = false;

  constructor() { }

  ngOnInit() {
  }

  comment() {
    this.onCommentClick.emit();
  }

  showProfile() {
    this.profileVisible = true;
  }

  hideProfile() {
    this.profileVisible = false;
  }
}
