/* Help from https://nehalist.io/uploading-files-in-angular2/ */
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { User } from '../../models/user-new';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { lang } from 'moment';


@Component({
  selector: 'gtc-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @Input() user: User;
  @Input() editable = false;
  form: FormGroup;

  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(private userService: UserService, private fb: FormBuilder) { 
    this.createForm();
  }

  ngOnInit() {
    
  }

  createForm() {
    this.form = this.fb.group({
      avatar: [null, Validators.required]
    });
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      let file = event.target.files[0];
      this.form.get('avatar').setValue(file);
    }
  }
  private prepareSave(): any {
    let input = new FormData();
    input.append('avatar', this.form.get('avatar').value);
    return input;
  }

  onSubmit() {
    const formModel = this.prepareSave();
    this.userService.editImage(formModel).subscribe(result => {
      this.user = result;
    })
  }

  clearFile() {
    this.form.get('avatar').setValue(null);
    this.fileInput.nativeElement.value = '';
  }

}
