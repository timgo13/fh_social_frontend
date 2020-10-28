import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginTokenDto } from './dto/login-token.dto';

@Injectable({ providedIn: 'root' })
export class AuthService {

  // TODO change to be set in build and deployment
  clientSecret = 'srKHlpLcnyLaBhZmQsAIuztgY7C0N8gjZPFKjYgu';
  clientID = '2';

  authUrl = this.apiService.BaseUrl + '/oauth/token';
  readonly options = {
    headers: new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json'
    })
  };

  constructor(private apiService: ApiService,
              private http: HttpClient) { }

  private static buildAuthHeader(): object {
    return {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      })
    };
  }

  isAuthenticated(): boolean {
    if (localStorage.getItem('access_token')) {
      return true;
    } else {
      localStorage.removeItem('access_token');
      return false;
    }
  }

  login$(username: string, password: string): Observable<LoginTokenDto> {
    return this.http.post<LoginTokenDto>(this.authUrl, {
      grant_type: 'password',
      client_id: this.clientID,
      client_secret: this.clientSecret,
      username,
      password,
      scope: ''
    }, this.options);
  }

  /**
   * Revoke the authenticated user token
   */
  logout$(): Observable<object> {
    return this.http.get<object>(this.apiService.apiBaseUrl + '/token/revoke', AuthService.buildAuthHeader());
  }
}

