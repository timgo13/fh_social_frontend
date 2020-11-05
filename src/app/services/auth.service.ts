import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginTokenDto } from './dto/login-token.dto';
import { JwtHelperService } from './jwt-helper.service';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {

  // TODO change to be set in build and deployment
  private clientSecret = 'CZZNVs6KyIv1quLBp4hFQ8voUNXNQ1Ndwb7zx4Md';
  private clientID = '2';

  authUrl = '/oauth/token';
  readonly options = {
    headers: new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json'
    })
  };

  constructor(private apiService: ApiService,
              private http: HttpClient,
              private jwtHelperService: JwtHelperService,
              private router: Router) { }

  public static buildAuthHeader(): object {
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
      const now = new Date();

      if (now > this.jwtHelperService.nbf() && now < this.jwtHelperService.exp()) {
        return true;
      } else {
        localStorage.removeItem('access_token');
        return false;
      }
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
  logout$(): Observable<string> {
    return this.http.get<string>(this.apiService.apiBaseUrl + '/token/revoke', AuthService.buildAuthHeader());
  }

  logout(): void {
    this.logout$().subscribe(res => {
      localStorage.removeItem('access_token');
      this.router.navigate(['/login']);
    }, error => {
      localStorage.removeItem('access_token');
      this.router.navigate(['/login']);
    });
  }

  getAuthenticatedUserID(): string | undefined {
    return this.jwtHelperService.id();
  }

  getAuthenticatedUserUsername(): string | undefined {
    return this.jwtHelperService.username();
  }
}

