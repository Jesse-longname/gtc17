import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'gtc-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() showNewPost: boolean = false;
  @Output() onNewPostHide: EventEmitter<any> = new EventEmitter();

  closeNewPost() {
    this.onNewPostHide.emit();
  }

  stopProp(event: Event) {
    event.stopPropagation();
  }

}
