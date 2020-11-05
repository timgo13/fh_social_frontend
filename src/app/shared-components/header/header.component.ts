import { Component, Input, OnInit } from '@angular/core';
import { CurrentPage } from './header-current-page.enum';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private navBarMenuActive = false;
  @Input() currentPage: CurrentPage;
  CurrentPage: any = CurrentPage;
  authenticatedUsername = this.authService.getAuthenticatedUserUsername();
  authenticatedUserID = this.authService.getAuthenticatedUserID();

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }


  logout(): void {
    this.authService.logout();
  }

  toggleNavBarMenu(): void {
    this.navBarMenuActive = !this.navBarMenuActive;
  }

  isNavBarMenuActive(): boolean {
    return this.navBarMenuActive;
  }
}
