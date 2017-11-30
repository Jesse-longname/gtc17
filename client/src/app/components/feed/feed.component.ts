import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'gtc-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  isNewPostVisible: boolean = false;
  posts: Post[] = [];

  constructor(private postService: PostService) {
  }
  
  ngOnInit() {
    this.getPosts();
  }

  hideNewPost() {
    this.isNewPostVisible = false;
  }

  showNewPost() {
    this.isNewPostVisible = true;
  }

  getPosts() {
    this.postService.getAllPosts().subscribe(result => {
      this.posts = result;
    })
  }

  likePost(post: Post) {
    this.postService.likePost(post).subscribe(result => {
      post = result;
    });
  }

  addNewItem(post: Post) {
    console.log(this.isNewPostVisible);
    this.postService.addPost(post).subscribe(result => {
      this.isNewPostVisible = false;
      this.getPosts();
    });
  }

}
