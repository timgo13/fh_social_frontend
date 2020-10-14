import { Component, Input, OnInit } from '@angular/core';
import { PostDto } from '../../services/dto/post.dto';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() post: PostDto;

  constructor() { }

  ngOnInit(): void {
  }
}
