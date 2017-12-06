import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { IUser } from './models/user';
import { User } from './models/user-new';
import { Observable } from 'rxjs/Observable';
import { UserService } from './services/user.service';

@Component({
  selector: 'gtc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  user: IUser = null;
  aUser: Observable<User> = null;
  theUser: User = null;
  profileVisible = false;

  constructor(private store: Store<any>, private userService: UserService) {
    this.aUser = userService.getUser();
    this.userService.getUser().subscribe(result => {
        this.theUser = result;
    })
    this.store.select('user').subscribe(data => {
      this.user = data;
    });
  }

  showProfile() {
    this.profileVisible = true;
  }

  hideProfile() {
    this.profileVisible = false;
  }
}
