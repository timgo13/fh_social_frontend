import { Component, OnInit } from '@angular/core';
import { PostDto } from '../../services/dto/post.dto';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {
  postId: number;
  post: PostDto;
  loading = true;

  constructor(private route: ActivatedRoute,
              private postService: PostService) { }

  ngOnInit(): void {
    this.postId = +this.route.snapshot.paramMap.get('id');

    if (this.postId && !isNaN(this.postId) && typeof this.postId === 'number') { // only if id is a valid number
      this.postService.getPost$(this.postId).subscribe(post => {
        this.post = post;
        this.loading = false;
      }, error => {
        this.loading = false;
      });
    } else {
      this.loading = false;
    }
  }

}
