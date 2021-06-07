import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { GroupRecommendationsDto } from './dto/group-recommendations.dto';
import { GroupRecommendationsDtov2} from './dto/group-rocommendations-v2.dto';

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {

  private apiURL = 'http://localhost:5000/api/recommendations';
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
      this.apiURL + '/user_group_recommendations/' + userID,
      this.options
    );
  }

  getPostGroupRecommendations$(inputPost: string, inputGroup: string): Observable<GroupRecommendationsDtov2> {
    if ( inputGroup === ''){
      inputGroup = 'None';
    }
    return this.http.post<GroupRecommendationsDtov2>(
      this.apiURL + '/post_group_recommendations',
      {post: inputPost, group: inputGroup},
      this.options
    );
  }
}


