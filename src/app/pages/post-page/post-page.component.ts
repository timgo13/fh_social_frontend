import { Component, OnInit } from '@angular/core';
import { PostDto } from '../../services/dto/post.dto';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {
  postId: number;
  post: PostDto;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.postId = +this.route.snapshot.paramMap.get('id');

    if (this.postId && !isNaN(this.postId)) { // only if id is a valid number

    }
    // TODO get Post via service
    this.post = {id: this.postId, content: 'yooo this is my first post on here. Plz like and Sub!!!', creatorId: 1, createdDate: new Date(), creatorName: 'Name'};
  }

}
