import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../../../models/post';

@Component({
  selector: 'gtc-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss']
})
export class PostItemComponent implements OnInit {
  @Input() post: Post;

  constructor() { }

  ngOnInit() {
  }

}
