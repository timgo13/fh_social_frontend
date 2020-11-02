import { Component, OnInit } from '@angular/core';
import { CurrentPage } from 'src/app/shared-components/header/header-current-page.enum';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  CurrentPage: any = CurrentPage;
  headerCurrentPage = CurrentPage.USER;
  userID = this.authService.clientID;

  constructor(private authService: AuthService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    if (this.userID === this.activatedRoute.snapshot.paramMap.get('id')) {
      this.headerCurrentPage = CurrentPage.PROFILE;
    }
  }

}
