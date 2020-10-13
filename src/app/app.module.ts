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

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

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
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
