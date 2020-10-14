import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeedPageComponent } from './pages/feed-page/feed-page.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { GroupPageComponent } from './pages/group-page/group-page.component';
import { CreatePostPageComponent } from './pages/create-post-page/create-post-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { WhenAuthenticatedGuard } from './services/guards/when-authenticated.guard';
import { WhenNotAuthenticatedGuard } from './services/guards/when-not-authenticated.guard';
import { PostPageComponent } from './pages/post-page/post-page.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [WhenAuthenticatedGuard],
    component: FeedPageComponent
  },
  {
    path: 'login',
    canActivate: [WhenNotAuthenticatedGuard],
    component: LoginPageComponent
  },
  {
    path: 'profile/:id',
    canActivate: [WhenAuthenticatedGuard],
    component: UserPageComponent
  },
  {
    path: 'group/:id',
    canActivate: [WhenAuthenticatedGuard],
    component: GroupPageComponent
  },
  {
    path: 'post/:id',
    canActivate: [WhenAuthenticatedGuard],
    component: PostPageComponent
  },
  {
    path: 'post',
    canActivate: [WhenAuthenticatedGuard],
    component: CreatePostPageComponent
  },
  {
    path: 'search',
    canActivate: [WhenAuthenticatedGuard],
    component: SearchPageComponent
  },

  // Fallback when no prior routes is matched
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
