import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecommendationService} from '../../services/recommendation.service';
import { GroupDto } from '../../services/dto/group.dto';
import { GroupRecommendationsDtov2} from '../../services/dto/group-rocommendations-v2.dto';
import { debounceTime, distinctUntilChanged, mergeMap } from 'rxjs/operators';
import {Subject, Subscription} from 'rxjs';
import { Observable} from 'rxjs';

@Component({
  selector: 'app-create-post-page',
  templateUrl: './create-post-page.component.html',
  styleUrls: ['./create-post-page.component.scss']
})
export class CreatePostPageComponent implements OnInit {

  userID: number = null;
  inputPost = '';
  inputGroup = '';
  loadingRecommendations = false;
  recommendations: GroupRecommendationsDtov2;
  groups: GroupDto[] = [];
  groupSelected = false;

  subscription: Subscription;
  keyUpText = new Subject<string>();

  constructor(private  router: Router,
              private recommendationService: RecommendationService) { }

  ngOnInit(): void {
    this.subscription = this.keyUpText.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      ).subscribe(() => {
        this.groupRecommendations();
    });
  }

  createPost(): void {

  }

  groupRecommendations(): void {
    this.groups = [];
    this.loadingRecommendations = true;
    this.groupSelected = false;
    this.recommendationService.getPostGroupRecommendations$(this.inputPost, this.inputGroup).subscribe(
      recommendations => {
        this.recommendations = recommendations;
        for (let i = 0; i < this.recommendations[0].length; i++){
          this.groups.push(
            { id: this.recommendations[0][i], creator_id: 0, name: this.recommendations[1][i], created_at: null, updated_at: null} );
        }
        this.loadingRecommendations = false;
      }, error => {
      console.log(error);
      });
  }

  groupChange(value): void {
    this.inputGroup = value;
    this.groupSelected = true;
  }

  onKeyUp(value): void {
    this.keyUpText.next(value);
  }

}
