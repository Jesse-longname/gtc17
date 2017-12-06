import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../models/user-new';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'gtc-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @Input() user: User;
  @Input() editable = true;

  constructor(private userService: UserService) { }

  ngOnInit() {
    
  }

  saveForm() {
    if (this.editable) {
      this.userService.editUser(this.user).subscribe(result => {
        
      });
    }
  }

}
