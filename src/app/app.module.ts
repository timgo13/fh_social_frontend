import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { FeedPageComponent } from './pages/feed-page/feed-page.component';
import { CreatePostPageComponent } from './pages/create-post-page/create-post-page.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { GroupPageComponent } from './pages/group-page/group-page.component';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { PostModule } from './shared-components/post/post.module';
import { HeaderModule } from './shared-components/header/header.module';
import { PostPageComponent } from './pages/post-page/post-page.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GroupSearchPageComponent } from './pages/group-search-page/group-search-page.component';
import { UserSearchPageComponent } from './pages/user-search-page/user-search-page.component';
import { UserModule } from './shared-components/user/user.module';
import { GroupModule } from './shared-components/group/group.module';
import { AuthInterceptor } from './services/AuthInterceptor';
import { CreatePrivatePostComponent } from './pages/feed-page/components/create-post/create-private-post.component';
import { CreateGroupPostComponent } from './pages/group-page/components/create-group-post/create-group-post.component';
import { UserGroupRecommendationComponent } from './shared-components/user-group-recommendation/user-group-recommendation.component';

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
    UserPageComponent,
    GroupPageComponent,
    PostPageComponent,
    GroupSearchPageComponent,
    UserSearchPageComponent,
    CreatePrivatePostComponent,
    CreateGroupPostComponent,
    UserGroupRecommendationComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    PostModule,
    UserModule,
    GroupModule,
    HeaderModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
