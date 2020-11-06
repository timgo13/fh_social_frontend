import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PostDto } from '../../services/dto/post.dto';
import { AuthService } from '../../services/auth.service';
import { CurrentPage } from 'src/app/shared-components/header/header-current-page.enum';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-feed-page',
  templateUrl: './feed-page.component.html',
  styleUrls: ['./feed-page.component.scss']
})
export class FeedPageComponent implements OnInit {
  @ViewChild('scrollContainer') scrollContainer: ElementRef;

  CurrentPage: any = CurrentPage;

  posts: PostDto[] = [];
  private pagesize = 30;
  private currentOffset = 0;
  private loading = false;
  private lastPageSize = this.pagesize;

  constructor(private authService: AuthService,
              private userService: UserService) { }

  ngOnInit(): void {
    this.loadPostsPage();
  }

  onListScroll(): void {
    const nativeElement = this.scrollContainer.nativeElement;

    // start loading 500px before the bottom
    if (nativeElement.scrollHeight - nativeElement.scrollTop <= nativeElement.clientHeight + 500) {
      this.loadPostsPage();
    }
  }

  private loadPostsPage(): void {
    if (!this.loading && this.lastPageSize === this.pagesize) { // check if the last loaded page was smaller then the regular page size
      this.loading = true;

      this.userService.getFeed$(this.currentOffset, this.pagesize).subscribe(posts => {
        this.posts = this.posts.concat(posts);
        this.lastPageSize = posts.length;
        this.loading = false;
      }, error => {
        console.log(error);
      });

      this.currentOffset += this.pagesize;
    }
  }

}
