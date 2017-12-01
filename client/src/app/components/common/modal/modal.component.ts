import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'gtc-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() visible: boolean = false;
  @Output() onHide: EventEmitter<any> = new EventEmitter();

  closeNewPost() {
    this.onHide.emit();
  }

  stopProp(event: Event) {
    event.stopPropagation();
  }

}
