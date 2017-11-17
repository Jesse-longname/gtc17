import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { IUser } from './models/user';

@Component({
  selector: 'gtc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  user: IUser = null;

  constructor(private store: Store<any>) {
    this.store.select('user').subscribe(data => {
      this.user = data;
    });
    this.registerServiceWorker();
  }

  registerServiceWorker() {
    if ('serviceWorker' in navigator && window.location.hostname !== 'localhost') {
      navigator.serviceWorker.register('/service-worker.js')
        .then((reg) => {
          reg.onupdatefound = () => {
            let installingWorker = reg.installing;
            installingWorker.onstatechange = () => {
              switch (installingWorker.state) {
                case 'installed':
                  if (navigator.serviceWorker.controller) {
                    // this.notificationService.serviceWorkerRefresh();
                    console.log('New or updated content is available.');
                  } else {
                    console.log('Content is now available offline!');
                  }
                  break;
                case 'redundant':
                  console.error('The installing service worker became redundant.');
                  break;
              };
            };
          };
          console.log('SW Registered');
        }).catch((err) => {
          console.log('SW Registration Error', err);
        });
    } else {
      console.log('No service worker or working locally');
    }
  }
}
