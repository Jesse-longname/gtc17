import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule, Store, ActionReducer } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RouterModule } from '@angular/router';
import { storeLogger } from 'ngrx-store-logger';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { FormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { environment } from '../environments/environment';

import { UserEffects } from './store/effects/user';

// Reducers
import { configReducer } from './store/reducers/configReducer';
import { feedReducer } from './store/reducers/feedReducer';
import { userReducer } from './store/reducers/userReducer';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { GraphComponent } from './components/graph/graph.component';
import { PersonalStatsComponent } from './components/personal-stats/personal-stats.component';
import { FeedComponent } from './components/feed/feed.component';
import { NewPostComponent } from './components/feed/new-post/new-post.component';
import { FeedItemComponent } from './components/feed/feed-item/feed-item.component';
import { StatComponent } from './components/personal-stats/stat/stat.component';
import { ChartsModule } from 'ng2-charts';
import { FooterComponent } from './components/footer/footer.component';
import { ModalComponent } from './components/common/modal/modal.component';
import { PostItemComponent } from './components/feed/post-item/post-item.component';

// Services
import { StatService } from './services/stat.service';
import { PostService } from './services/post.service';
import { DataService } from './services/data.service';
import { ThreadComponent } from './components/feed/thread/thread.component';

export function logger(reducer: ActionReducer<any>): any {
  return storeLogger()(reducer);
}

export const metaReducers = !environment.production ? [logger] : [];

const routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'stats', component: StatComponent },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GraphComponent,
    PersonalStatsComponent,
    FeedComponent,
    NewPostComponent,
    FeedItemComponent,
    StatComponent,
    FooterComponent,
    ModalComponent,
    PostItemComponent,
    ThreadComponent
  ],
  imports: [
    ChartsModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot({
      config: configReducer,
      feed: feedReducer,
      user: userReducer,
    }, { metaReducers }),
    EffectsModule.forRoot([
      UserEffects
    ]),
    StoreDevtoolsModule.instrument({
      maxAge: 5
    }),
  ],
  providers: [StatService, PostService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private store: Store<any>) {
    // Starts App
    this.store.dispatch({
      type: 'APP_START'
    });
  }
}
