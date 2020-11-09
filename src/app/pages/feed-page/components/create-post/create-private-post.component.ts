import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../../services/post.service';
import { CreatePostDto } from '../../../../services/dto/create-post.dto';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-create-private-post',
  templateUrl: './create-private-post.component.html',
  styleUrls: ['./create-private-post.component.scss']
})
export class CreatePrivatePostComponent implements OnInit {

  open = false;
  toShort = false;
  loading = false;
  postCreated = false;
  createPostDto: CreatePostDto = {} as CreatePostDto;

  constructor(private postService: PostService,
              private authService: AuthService) {}

  ngOnInit(): void {
    this.createPostDto.content = '';
    this.createPostDto.creator_id = this.authService.getAuthenticatedUserID();
    this.createPostDto.user_feed_id = this.createPostDto.creator_id;
  }

  submit(): void {
    if (this.createPostDto.content.length === 0) {
      this.toShort = true;
    } else {
      this.toShort = false;
      this.loading = true;
      this.postService.createPost$(this.createPostDto).subscribe(post => {
        this.loading = false;
        this.postCreated = true;
      });
    }
  }

}
