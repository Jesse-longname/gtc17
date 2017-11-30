import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { CallOutcome } from '../../../models/call-outcome';
import { Category } from '../../../models/category';
import { Post } from '../../../models/post';

@Component({
  selector: 'gtc-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {
  @Output() onAddPost: EventEmitter<Post> = new EventEmitter();

  callOutcomes: CallOutcome[] = [];
  categories: Category[] = [];
  selectAnOutcome = new CallOutcome();
  selectACategory = new Category();

  //Form Data
  post: Post = new Post();

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.dataService.getCallOutcomes().subscribe(result => this.callOutcomes = result);
    this.dataService.getCategories().subscribe(result => this.categories = result);
  }

  onAddPostClick() {
    console.log(this.categories);
    this.onAddPost.emit(this.post);
    this.post = new Post();
  }
}
