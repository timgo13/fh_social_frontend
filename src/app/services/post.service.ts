import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from './jwt-helper.service';
import { PostDto } from './dto/post.dto';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private apiService: ApiService,
              private http: HttpClient,
              private jwtHelperService: JwtHelperService) { }

  getFeed$(): Observable<PostDto[]> {
    const id = this.jwtHelperService.id();
    return this.http.get<PostDto[]>(this.apiService.apiBaseUrl + '/user/' + id + '/feed', AuthService.buildAuthHeader());
  }
}
