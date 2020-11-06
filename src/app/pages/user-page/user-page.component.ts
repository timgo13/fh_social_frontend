import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CurrentPage } from 'src/app/shared-components/header/header-current-page.enum';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { UserDto } from '../../services/dto/user.dto';
import { ViewState } from './viewState';
import { PostDto } from '../../services/dto/post.dto';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {
  @ViewChild('scrollContainer') scrollContainer: ElementRef;

  CurrentPage: any = CurrentPage;
  ViewState: any = ViewState;
  viewState: ViewState = ViewState.POSTS;

  posts: PostDto[] = [];
  private pagesize = 30;
  private currentOffset = 0;
  private loadingPosts = false;
  private lastPageSize = this.pagesize;

  loadingSubscription = true;
  subscribed = false;

  headerCurrentPage = CurrentPage.USER;
  userID = '';
  user: UserDto;
  authenticatedUserID = this.authService.getAuthenticatedUserID();

  userSubscriptions = [];
  groupSubscriptions = [];
  userSubscribers = [];

  loading = true;

  constructor(private authService: AuthService,
              private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
  }

  ngOnInit(): void {
    this.userID = this.activatedRoute.snapshot.paramMap.get('id');
    if (+this.authenticatedUserID === +this.userID) {
      this.headerCurrentPage = CurrentPage.PROFILE;
    }

    this.userService.getUser$(this.userID).subscribe(user => {
      this.user = user;
      this.loading = false;
    }, error => {
      this.loading = false;
    });

    this.loadPostsPage();

    this.userService.getGroupSubscriptions$(this.userID).subscribe(groups => {
      this.groupSubscriptions = groups;
    });

    this.userService.getUserSubscriptions$(this.userID).subscribe(users => {
      this.userSubscriptions = users;
    });

    this.userService.getUserSubscriptions$(this.authenticatedUserID).subscribe(users => {
      for (const user of users) {
        if (+this.userID === +user.id) {
          this.subscribed = true;
          break;
        }
      }
      this.loadingSubscription = false;
    });

    this.loadUserSubscribers();
  }

  onListScroll(): void {
    const nativeElement = this.scrollContainer.nativeElement;

    // start loading 500px before the bottom
    if (nativeElement.scrollHeight - nativeElement.scrollTop <= nativeElement.clientHeight + 500) {
      this.loadPostsPage();
    }
  }

  loadUserSubscribers(): void {
    this.userService.getUserSubscribers$(this.userID).subscribe(users => {
      this.userSubscribers = users;
    });
  }

  private loadPostsPage(): void {
    if (!this.loadingPosts && this.lastPageSize === this.pagesize) { // check if the last loaded page was smaller then the regular page size
      this.loadingPosts = true;

      this.userService.getPosts$(this.userID, this.currentOffset, this.pagesize).subscribe(posts => {
        this.posts = this.posts.concat(posts);
        this.lastPageSize = posts.length;
        this.loadingPosts = false;
      }, error => {
        console.log(error);
      });

      this.currentOffset += this.pagesize;
    }
  }

  onSubscribeClick(): void {
    this.userService.subscribeToUser$(this.authenticatedUserID, this.userID).subscribe(res => {
      this.subscribed = true;
      this.loadUserSubscribers();
    }, error => {
      console.log(error);
    });
  }

  onUnsubscribeClick(): void {
    this.userService.unsubscribeFromUser$(this.authenticatedUserID, this.userID).subscribe(res => {
      this.subscribed = false;
      this.loadUserSubscribers();
    }, error => {
      console.log(error);
    });
  }

}
