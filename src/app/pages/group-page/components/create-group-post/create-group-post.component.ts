import { Component, Input, OnInit } from '@angular/core';
import { CreatePostDto} from '../../../../services/dto/create-post.dto';
import { PostService } from '../../../../services/post.service';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-create-group-post',
  templateUrl: './create-group-post.component.html',
  styleUrls: ['./create-group-post.component.scss']
})
export class CreateGroupPostComponent implements OnInit {

  @Input() groupID: string;

  toShort = false;
  loading = false;
  postCreated = false;
  createPostDto: CreatePostDto = {} as CreatePostDto;

  constructor(private postService: PostService,
              private authService: AuthService) {}

  ngOnInit(): void {
    this.createPostDto.content = '';
    this.createPostDto.creator_id = this.authService.getAuthenticatedUserID();
    this.createPostDto.group_feed_id = this.groupID;
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
