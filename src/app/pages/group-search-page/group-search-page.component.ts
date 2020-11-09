import { Component } from '@angular/core';
import { CurrentPage } from 'src/app/shared-components/header/header-current-page.enum';
import { GroupDto } from '../../services/dto/group.dto';
import { GroupService } from '../../services/group.service';

@Component({
  selector: 'app-group-search-page',
  templateUrl: './group-search-page.component.html',
  styleUrls: ['./group-search-page.component.scss']
})
export class GroupSearchPageComponent {

  query = '';
  loading = false;
  private lastSearchId = 0;
  private searchDebouncingDelay = 400; // ms
  noSearchYet = true;

  CurrentPage: any = CurrentPage;
  groups: GroupDto[] = [];

  constructor(private groupService: GroupService) {}

  onSearchType(): void {
    this.noSearchYet = false;

    if (this.query.length === 0) {
      this.lastSearchId++;
      this.groups = [];
      this.loading = false;
    } else {
      const searchId = ++this.lastSearchId;
      this.loading = true;

      setTimeout(() => {
        if (searchId === this.lastSearchId) {
          this.groupService.searchGroup$(this.query).subscribe(groups => {
            if (this.lastSearchId === searchId) {
              this.groups = groups;
              this.loading = false;
            }
          }, error => {
            if (this.lastSearchId === searchId) {
              this.groups = [];
              this.loading = false;
            }
          });
        } // else  => Do nothing => query is outdated
      }, this.searchDebouncingDelay);
    }
  }

}
