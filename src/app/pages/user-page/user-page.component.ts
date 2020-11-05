import { Component, OnInit } from '@angular/core';
import { CurrentPage } from 'src/app/shared-components/header/header-current-page.enum';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { UserDto } from '../../services/dto/user.dto';
import { ViewState } from './viewState';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  CurrentPage: any = CurrentPage;
  ViewState: any = ViewState;
  viewState: ViewState = ViewState.POSTS;

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

    this.userService.getGroupSubscriptions$(this.userID).subscribe(groups => {
      this.groupSubscriptions = groups;
    });

    this.userService.getUserSubscriptions$(this.userID).subscribe(users => {
      this.userSubscriptions = users;
    });

    this.userService.getUserSubscribers$(this.userID).subscribe(users => {
      this.userSubscribers = users;
    });
  }

  onListScroll(): void {

  }

}
