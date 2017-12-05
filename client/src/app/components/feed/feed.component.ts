import { Component, OnInit, HostListener } from '@angular/core';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';
import { ViewEncapsulation } from '@angular/compiler/src/core';

@Component({
  selector: 'gtc-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  isNewPostVisible: boolean = false;
  isThreadVisible: boolean = false;
  selectedPost: Post;
  posts: Post[] = [];
  displayPosts: Post[] = [];

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
      this.showNextTen();
      this.updateDisplayList();
    })
  }

  showNextTen() {
    let index = this.displayPosts.length;
    for (let i = index; i < index + 10; i++) {
      if (this.posts[i]) {
        this.displayPosts.push(this.posts[i]);
      }
    }
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      // you're at the bottom of the page
      this.showNextTen();
    }
  }

  updateDisplayList() {
    if (this.posts[0] != this.displayPosts[0]) {
      this.displayPosts.unshift(this.posts[0]);
    }
  }

  likePost(post: Post) {
    this.postService.likePost(post).subscribe(result => {
      post = result;
    });
  }

  openThread(post: Post) {
    this.selectedPost = post;
    this.isThreadVisible = true;
  }

  hideThread() {
    this.isThreadVisible = false;
  }

  addNewItem(post: Post) {
    this.postService.addPost(post).subscribe(result => {
      this.isNewPostVisible = false;
      this.getPosts();
    });
  }

}
