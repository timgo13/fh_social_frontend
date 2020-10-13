import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { FeedPageComponent } from './pages/feed-page/feed-page.component';
import { CreatePostPageComponent } from './pages/create-post-page/create-post-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { GroupPageComponent } from './pages/group-page/group-page.component';
import { HeaderComponent } from './shared-components/header/header.component';
import { PostComponent } from './shared-components/post/post.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    FeedPageComponent,
    CreatePostPageComponent,
    SearchPageComponent,
    UserPageComponent,
    GroupPageComponent,
    HeaderComponent,
    PostComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
