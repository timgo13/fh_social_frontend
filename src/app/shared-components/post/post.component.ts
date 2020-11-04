import { Component, Input, OnInit } from '@angular/core';
import { PostDto } from '../../services/dto/post.dto';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() post: PostDto;
  childPost = null;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    if (this.post.child_post_id) {
      this.postService.getPost$(this.post.child_post_id).subscribe(childPost => {
        this.childPost = childPost;
      });
    }
  }
}
