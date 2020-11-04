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
  }
}
