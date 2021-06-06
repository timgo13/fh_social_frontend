import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { GroupRecommendationsDto } from './dto/group-recommendations.dto';

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {

  private apiURL = '/api/recommendations';
  readonly options = {
    headers: new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    })
  };

  result: Observable<GroupRecommendationsDto>;

  constructor(private http: HttpClient) { }

  getUserGroupRecommendations$(userID: string): Observable<GroupRecommendationsDto> {
    return this.http.get<GroupRecommendationsDto>(
      'http://localhost:5000/api/recommendations/user_group_recommendations/' + userID,
      // this.apiURL + '/user_group_recommendations/' + userID,
      this.options
    );
  }
}


