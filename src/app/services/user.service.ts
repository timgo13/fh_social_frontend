import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostDto } from './dto/post.dto';
import { AuthService } from './auth.service';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from './jwt-helper.service';
import { GroupDto } from './dto/group.dto';
import { UserDto } from './dto/user.dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apiService: ApiService,
              private http: HttpClient,
              private jwtHelperService: JwtHelperService) { }

  getUser$(userID: string): Observable<UserDto> {
    return this.http.get<UserDto>(
      this.apiService.apiBaseUrl + '/user/' + userID,
      AuthService.buildAuthHeader()
    );
  }

  getFeed$(offset: number, limit: number): Observable<PostDto[]> {
    const id = this.jwtHelperService.id();
    return this.http.get<PostDto[]>(
      this.apiService.apiBaseUrl + '/user/' + id + '/feed' + this.apiService.sqlURLPath + '?offset=' + offset + '&limit=' + limit + '',
      AuthService.buildAuthHeader()
    );
  }

  getPosts$(userID: string, offset: number, limit: number): Observable<PostDto[]> {
    return this.http.get<PostDto[]>(
      this.apiService.apiBaseUrl + '/user/' + userID + '/post' + this.apiService.sqlURLPath + '?offset=' + offset + '&limit=' + limit + '',
      AuthService.buildAuthHeader()
    );
  }

  getUserSubscriptions$(userID: string): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(
      this.apiService.apiBaseUrl + '/user/' + userID + '/subscription/user' + this.apiService.sqlURLPath,
      AuthService.buildAuthHeader()
    );
  }

  getGroupSubscriptions$(userID: string): Observable<GroupDto[]> {
    return this.http.get<GroupDto[]>(
      this.apiService.apiBaseUrl + '/user/' + userID + '/subscription/group' + this.apiService.sqlURLPath,
      AuthService.buildAuthHeader()
    );
  }

  getUserSubscribers$(userID: string): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(
      this.apiService.apiBaseUrl + '/user/' + userID + '/subscriber/user' + this.apiService.sqlURLPath,
      AuthService.buildAuthHeader()
    );
  }

  subscribeToGroup$(userID: string, groupID: string): Observable<string> {
    return this.http.put<string>(
      this.apiService.apiBaseUrl + '/user/' + userID + '/subscription/group/' + groupID,
      {},
    AuthService.buildAuthHeader()
    );
  }

  unsubscribeFromGroup$(userID: string, groupID: string): Observable<string> {
    return this.http.delete<string>(
      this.apiService.apiBaseUrl + '/user/' + userID + '/subscription/group/' + groupID,
      AuthService.buildAuthHeader()
    );
  }

  subscribeToUser$(subscriberID: string, publischerID: string): Observable<string> {
    return this.http.put<string>(
      this.apiService.apiBaseUrl + '/user/' + subscriberID + '/subscription/user/' + publischerID,
      {},
      AuthService.buildAuthHeader()
    );
  }

  unsubscribeFromUser$(subscriberID: string, publischerID: string): Observable<string> {
    return this.http.delete<string>(
      this.apiService.apiBaseUrl + '/user/' + subscriberID + '/subscription/user/' + publischerID,
      AuthService.buildAuthHeader()
    );
  }

}
