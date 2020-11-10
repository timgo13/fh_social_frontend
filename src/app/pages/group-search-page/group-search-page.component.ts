import { Component, OnInit } from '@angular/core';
import { CurrentPage } from 'src/app/shared-components/header/header-current-page.enum';
import { GroupDto } from '../../services/dto/group.dto';
import { GroupService } from '../../services/group.service';
import { CreateGroupDto } from '../../services/dto/create-group.dto';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-group-search-page',
  templateUrl: './group-search-page.component.html',
  styleUrls: ['./group-search-page.component.scss']
})
export class GroupSearchPageComponent implements OnInit{

  query = '';
  loading = false;
  private lastSearchId = 0;
  private searchDebouncingDelay = 400; // ms
  noSearchYet = true;

  CurrentPage: any = CurrentPage;
  groups: GroupDto[] = [];

  createGroupModalActive = false;
  groupCreated = false;
  loadingNewGroup = false;
  groupExists = false;
  newGroup: GroupDto;
  createGroupDto: CreateGroupDto = {} as CreateGroupDto;
  groupNameToShort = false;

  constructor(private groupService: GroupService,
              private authService: AuthService) {}

  ngOnInit(): void {
    this.createGroupDto.name = '';
    this.createGroupDto.creator_id = this.authService.getAuthenticatedUserID();
  }

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

  onCloseModalClick(): void {
    this.createGroupModalActive = false;
  }

  onSubmitCreateGroupClick(): void {
    if (this.createGroupDto.name.length === 0) {
      this.groupNameToShort = true;
      return;
    }

    this.groupNameToShort = false;
    this.loadingNewGroup = true;
    this.groupExists = false;

    this.groupService.createGroup$(this.createGroupDto).subscribe(group => {
      this.newGroup = group;
      this.loadingNewGroup = false;
      this.groupCreated = true;
    }, error => {
      this.loadingNewGroup = false;
      this.groupExists = true;
    });
  }

}
