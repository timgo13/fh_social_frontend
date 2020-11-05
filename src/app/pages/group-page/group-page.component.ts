import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CurrentPage } from 'src/app/shared-components/header/header-current-page.enum';
import { GroupService } from '../../services/group.service';
import { GroupDto } from '../../services/dto/group.dto';
import { ActivatedRoute, Router } from '@angular/router';
import { PostDto } from '../../services/dto/post.dto';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { ViewState } from './viewState';
import { UserDto } from '../../services/dto/user.dto';

@Component({
  selector: 'app-group-page',
  templateUrl: './group-page.component.html',
  styleUrls: ['./group-page.component.scss']
})
export class GroupPageComponent implements OnInit {
  @ViewChild('scrollContainer') scrollContainer: ElementRef;

  CurrentPage: any = CurrentPage;
  ViewState: any = ViewState;
  viewState: ViewState = ViewState.POSTS;

  groupID = '';
  group: GroupDto;

  loadingGroup = true;

  loadingSubscription = true;
  subscribed = false;

  authenticatedUserID = this.authService.getAuthenticatedUserID();

  posts: PostDto[] = [];
  private pagesize = 30;
  private currentOffset = 0;
  private loadingPost = false;
  private lastPageSize = this.pagesize;

  subscribers: UserDto[] = [];

  constructor(private groupService: GroupService,
              private userService: UserService,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService,
              private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
  }

  ngOnInit(): void {
    this.groupID = this.activatedRoute.snapshot.paramMap.get('id');

    this.groupService.getGroup$(this.groupID).subscribe(group => {
      this.group = group;
      this.loadingGroup = false;
    }, error => {
      this.loadingGroup = false;
    });

    this.loadPostsPage();

    this.userService.getGroupSubscriptions$(this.authenticatedUserID).subscribe(groups => {
      for (const group of groups) {
        if (+this.groupID === +group.id) {
          this.subscribed = true;
          break;
        }
      }
      this.loadingSubscription = false;
    });

    //this.userService.getGroupSubscribers$() {

    //}
  }

  onListScroll(): void {
    const nativeElement = this.scrollContainer.nativeElement;

    // start loading 400px before the bottom
    if (nativeElement.scrollHeight - nativeElement.scrollTop <= nativeElement.clientHeight + 500) {
      this.loadPostsPage();
    }
  }

  loadPostsPage(): void {
    if (!this.loadingPost && this.lastPageSize === this.pagesize) { // check if the last loaded page was smaller then the regular page size
      this.loadingPost = true;

      this.groupService.getPosts$(this.groupID, this.currentOffset, this.pagesize).subscribe(posts => {
        this.posts = this.posts.concat(posts);
        this.lastPageSize = posts.length;
        this.loadingPost = false;
      }, error => {
        console.log(error);
      });

      this.currentOffset += this.pagesize;
    }
  }

  onSubscribeClick(): void {
    this.userService.subscribeToGroup$(this.authenticatedUserID, this.groupID).subscribe(res => {
      this.subscribed = true;
    }, error => {
      console.log(error);
    });
  }

  onUnsubscribeClick(): void {
    this.userService.unsubscribeFromGroup$(this.authenticatedUserID, this.groupID).subscribe(res => {
      this.subscribed = false;
    }, error => {
      console.log(error);
    });
  }

}
