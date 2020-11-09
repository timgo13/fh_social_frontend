import { Component, Input, OnInit } from '@angular/core';
import { PostDto } from '../../services/dto/post.dto';
import { AuthService } from '../../services/auth.service';
import { CreatePostDto } from '../../services/dto/create-post.dto';
import { GroupDto } from '../../services/dto/group.dto';
import { UserService } from '../../services/user.service';
import { NgSelectConfig } from '@ng-select/ng-select';
import { TranslateService } from '@ngx-translate/core';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() post: PostDto;
  @Input() showShareButton = true;

  selectedGroupID: number;
  selectedGroup: GroupDto;
  groups: GroupDto[] = [];

  shareModalActive = false;
  toShort = false;
  loading = false;
  postCreated = false;

  currentDate: Date = new Date();
  dateInterval;
  authenticatedUserUsername = this.authService.getAuthenticatedUserUsername();
  createPostDto: CreatePostDto = {} as CreatePostDto;

  constructor(private authService: AuthService,
              private userService: UserService,
              private postService: PostService,
              private config: NgSelectConfig,
              private translate: TranslateService) {
    this.config.notFoundText = this.translate.instant('post.share.group-not-found');
    this.config.placeholder = this.translate.instant('post.share.no-group');
  }

  ngOnInit(): void {
    this.dateInterval = window.setInterval(() => {
      this.currentDate = new Date();
    }, 1000);

    this.createPostDto.content = '';
    this.createPostDto.creator_id = this.authService.getAuthenticatedUserID();
    this.createPostDto.child_post_id = this.post.id + '';
  }

  onShareClick(): void {
    this.shareModalActive = true;
    this.userService.getGroupSubscriptions$(this.authService.getAuthenticatedUserID()).subscribe(groups => {
      this.groups = groups;
    });
  }

  onCloseModalClick(): void {
    this.shareModalActive = false;
  }

  onSubmitSharePostClick(): void {
    if (this.createPostDto.content.length === 0) {
      this.toShort = true;
    } else {
      if (this.selectedGroupID) {
        this.createPostDto.group_feed_id = this.selectedGroupID + '';
        this.createPostDto.user_feed_id = undefined;
      } else {
        this.createPostDto.group_feed_id = undefined;
        this.createPostDto.user_feed_id = this.authService.getAuthenticatedUserID();
      }


      this.toShort = false;
      this.loading = true;
      clearInterval(this.dateInterval);
      console.log(this.createPostDto);
      this.postService.createPost$(this.createPostDto).subscribe(post => {
        this.loading = false;
        this.postCreated = true;
      });
    }
  }

  groupSelected(): void {
    for (const group of this.groups) {
      if (group.id === this.selectedGroupID) {
        this.selectedGroup = group;
        break;
      }
    }
  }

}
