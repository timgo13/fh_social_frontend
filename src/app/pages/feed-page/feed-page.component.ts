import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PostDto } from '../../services/dto/post.dto';
import { AuthService } from '../../services/auth.service';
import { PostService } from '../../services/post.service';
import { CurrentPage } from 'src/app/shared-components/header/header-current-page.enum';

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
              private postService: PostService) { }

  ngOnInit(): void {
    this.loadPostsPage();
  }

  onListScroll(): void {
    console.log('scroll');
    const nativeElement = this.scrollContainer.nativeElement;

    // start loading 400px before the bottom
    if (nativeElement.scrollHeight - nativeElement.scrollTop <= nativeElement.clientHeight + 400) {
      this.loadPostsPage();
    }
  }

  loadPostsPage(): void {
    if (!this.loading && this.lastPageSize === this.pagesize) { // check if the last loaded page was smaller then the regular page size
      this.loading = true;

      this.postService.getFeed$(this.currentOffset, this.pagesize).subscribe(posts => {
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
