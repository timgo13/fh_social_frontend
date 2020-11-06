import { Component, Input } from '@angular/core';
import { PostDto } from '../../services/dto/post.dto';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {
  @Input() post: PostDto;

  shareModalActive = false;

  onShareClick(): void {
    this.shareModalActive = true;
  }

  onCloseModalClick(): void {
    this.shareModalActive = false;
  }
}
