import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeedPageComponent } from './pages/feed-page/feed-page.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { GroupPageComponent } from './pages/group-page/group-page.component';
import { CreatePostPageComponent } from './pages/create-post-page/create-post-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';

const routes: Routes = [
  {
    path: '',
    component: FeedPageComponent
  },
  {
    path: 'profile/:id',
    component: UserPageComponent
  },
  {
    path: 'group/:id',
    component: GroupPageComponent
  },
  {
    path: 'post',
    component: CreatePostPageComponent
  },
  {
    path: 'search',
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
export class AppRoutingModule { }
