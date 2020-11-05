import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CurrentPage } from 'src/app/shared-components/header/header-current-page.enum';
import { GroupService } from '../../services/group.service';
import { GroupDto } from '../../services/dto/group.dto';
import { ActivatedRoute } from '@angular/router';
import { PostDto } from '../../services/dto/post.dto';

@Component({
  selector: 'app-group-page',
  templateUrl: './group-page.component.html',
  styleUrls: ['./group-page.component.scss']
})
export class GroupPageComponent implements OnInit {
  @ViewChild('scrollContainer') scrollContainer: ElementRef;

  CurrentPage: any = CurrentPage;
  groupID = '';
  group: GroupDto;

  loadingGroup = true;

  posts: PostDto[] = [];
  private pagesize = 30;
  private currentOffset = 0;
  private loadingPost = false;
  private lastPageSize = this.pagesize;

  constructor(private groupService: GroupService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.groupID = this.activatedRoute.snapshot.paramMap.get('id');

    this.groupService.getGroup$(this.groupID).subscribe(group => {
      this.group = group;
      this.loadingGroup = false;
    }, error => {
      this.loadingGroup = false;
    });

    this.loadPostsPage();
  }

  onListScroll(): void {
    const nativeElement = this.scrollContainer.nativeElement;

    // start loading 400px before the bottom
    if (nativeElement.scrollHeight - nativeElement.scrollTop <= nativeElement.clientHeight + 400) {
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

}
