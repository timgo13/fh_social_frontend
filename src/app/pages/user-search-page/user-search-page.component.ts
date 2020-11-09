import { Component } from '@angular/core';
import { CurrentPage } from 'src/app/shared-components/header/header-current-page.enum';
import { UserDto } from '../../services/dto/user.dto';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-search-page',
  templateUrl: './user-search-page.component.html',
  styleUrls: ['./user-search-page.component.scss']
})
export class UserSearchPageComponent {

  query = '';
  loading = false;
  private lastSearchId = 0;
  private searchDebouncingDelay = 400; // ms
  noSearchYet = true;

  CurrentPage: any = CurrentPage;
  users: UserDto[] = [];

  constructor(private userService: UserService) {}

  onSearchType(): void {
    this.noSearchYet = false;

    if (this.query.length === 0) {
      this.lastSearchId++;
      this.users = [];
      this.loading = false;
    } else {
      const searchId = ++this.lastSearchId;
      this.loading = true;

      setTimeout(() => {
        if (searchId === this.lastSearchId) {
          this.userService.searchUsers$(this.query).subscribe(users => {
            if (this.lastSearchId === searchId) {
              this.users = users;
              this.loading = false;
            }
          }, error => {
            if (this.lastSearchId === searchId) {
              this.users = [];
              this.loading = false;
            }
          });
        } // else  => Do nothing => query is outdated
      }, this.searchDebouncingDelay);
    }
  }

}
