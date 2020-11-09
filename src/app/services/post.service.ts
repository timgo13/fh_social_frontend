import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { PostDto } from './dto/post.dto';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private apiService: ApiService,
              private http: HttpClient) { }

  getPost$(id: number): Observable<PostDto> {
    return this.http.get<PostDto>(
      this.apiService.apiBaseUrl + '/post/' + id,
      AuthService.buildAuthHeader()
    );
  }

  createPost$(createPostDto: CreatePostDto): Observable<PostDto> {
    return this.http.post<PostDto>(
      this.apiService.apiBaseUrl + '/post/',
      createPostDto,
      AuthService.buildAuthHeader()
    );
  }
}
