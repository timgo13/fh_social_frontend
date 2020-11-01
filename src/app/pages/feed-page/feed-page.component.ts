import { Component, OnInit } from '@angular/core';
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

  CurrentPage: any = CurrentPage;

  posts: PostDto[] = [
    {id: 1, content: 'Content Post 1', createdDate: new Date(), creatorId: 1, creatorName: 'Name', childPost: {id: 2, content: 'Content Post 2', createdDate: new Date(), creatorId: 1, creatorName: 'Name'}},
    {id: 2, content: 'Content Post 2', createdDate: new Date(), creatorId: 1, creatorName: 'Name'},
    {id: 3, content: 'Content Post 3', createdDate: new Date(), creatorId: 1, creatorName: 'Name'},
    {id: 4, content: 'Content Post 4', createdDate: new Date(), creatorId: 1, creatorName: 'Name'},
    ];

  constructor(private authService: AuthService,
              private postService: PostService) { }

  ngOnInit(): void {
    this.postService.getFeed$().subscribe(posts => {
      console.log(posts);
      this.posts = posts;
    }, error => {
      console.log(error);
    });
    // TODO load post via Service
  }
}
