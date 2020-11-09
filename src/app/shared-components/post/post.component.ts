import { Component, Input, OnInit } from '@angular/core';
import { PostDto } from '../../services/dto/post.dto';
import { AuthService } from '../../services/auth.service';
import {CreatePostDto} from '../../services/dto/create-post.dto';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() post: PostDto;
  @Input() showShareButton = true;

  shareModalActive = false;
  privateShare = true;

  currentDate: Date = new Date();
  authenticatedUserUsername = this.authService.getAuthenticatedUserUsername();
  createPostDto: CreatePostDto = {} as CreatePostDto;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    window.setInterval(() => {
      this.currentDate = new Date();
    }, 1000);
  }

  onShareClick(): void {
    this.shareModalActive = true;
  }

  onCloseModalClick(): void {
    this.shareModalActive = false;
  }

  onSubmitSharePostClick(): void { // TODO

  }

}
