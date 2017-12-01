import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../../../models/post';
import { PostService } from '../../../services/post.service';

@Component({
  selector: 'gtc-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.scss']
})
export class ThreadComponent implements OnInit {
  @Input() parent: Post;
  commentText: string = "";

  constructor(private postService: PostService) { }

  ngOnInit() {
  }

  comment() {
    this.postService.createComment(this.parent, this.commentText).subscribe(result => {
      this.parent.children.push(result);
      setTimeout(this.scrollToBottom(".children"), 100);
      this.commentText = "";
    });
  }

  scrollToBottom(selector: string, duration = 400) {
    let element = document.querySelector(selector);
    if (duration <= 0) return;
    let difference = element.scrollHeight - element.scrollTop - element.clientHeight;
    // console.log(difference);
    let perTick = difference / duration * 10;

    setTimeout(() => {
      element.scrollTop = element.scrollTop + perTick;
      if (element.scrollTop === element.scrollHeight) return;
      this.scrollToBottom(selector, duration-10);
    })
    // document.querySelector(selector).scrollTo(0, document.querySelector(selector).scrollHeight);
  }

}
