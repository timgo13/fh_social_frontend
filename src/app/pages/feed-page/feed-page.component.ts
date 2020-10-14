import { Component, OnInit } from '@angular/core';
import { PostDto } from '../../services/dto/post.dto';

@Component({
  selector: 'app-feed-page',
  templateUrl: './feed-page.component.html',
  styleUrls: ['./feed-page.component.scss']
})
export class FeedPageComponent implements OnInit {

  posts: PostDto[] = [
    {id: 1, content: 'Content Post 1', createdDate: new Date(), creatorId: 1, creatorName: 'Name', childPost: {id: 2, content: 'Content Post 2', createdDate: new Date(), creatorId: 1, creatorName: 'Name', childPost: {id: 3, content: 'Content Post 3', createdDate: new Date(), creatorId: 1, creatorName: 'Name'}}},
    {id: 2, content: 'Content Post 2', createdDate: new Date(), creatorId: 1, creatorName: 'Name'},
    {id: 3, content: 'Content Post 3', createdDate: new Date(), creatorId: 1, creatorName: 'Name'},
    {id: 4, content: 'Content Post 4', createdDate: new Date(), creatorId: 1, creatorName: 'Name'},
    ];

  constructor() { }

  ngOnInit(): void {
    // TODO load post via Service
  }

}
