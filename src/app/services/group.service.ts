import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { GroupDto } from './dto/group.dto';
import { PostDto } from './dto/post.dto';
import { UserDto } from './dto/user.dto';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private apiService: ApiService,
              private http: HttpClient) { }

  getGroup$(groupID: string): Observable<GroupDto> {
    return this.http.get<GroupDto>(
      this.apiService.apiBaseUrl + '/group/' + groupID,
      AuthService.buildAuthHeader()
    );
  }

  getPosts$(groupID: string, offset: number, limit: number): Observable<PostDto[]> {
    return this.http.get<PostDto[]>(
      // tslint:disable-next-line:max-line-length
      this.apiService.apiBaseUrl + '/group/' + groupID + '/post' + this.apiService.sqlURLPath + '?offset=' + offset + '&limit=' + limit + '',
      AuthService.buildAuthHeader()
    );
  }

  getSubscribers$(groupID: string): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(
      this.apiService.apiBaseUrl + '/group/' + groupID + '/subscriber' + this.apiService.sqlURLPath,
      AuthService.buildAuthHeader()
    );
  }
}
