import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupRecommendationsDto } from '../../services/dto/group-recommendations.dto';
import { RecommendationService} from '../../services/recommendation.service';
import { GroupDto } from '../../services/dto/group.dto';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-group-recommendation',
  templateUrl: './user-group-recommendation.component.html',
  styleUrls: ['./user-group-recommendation.component.scss']
})
export class UserGroupRecommendationComponent implements OnInit {

  recommendations: GroupRecommendationsDto;
  group: GroupDto = { id: 0, creator_id: 0, name: '', created_at: null, updated_at: null};
  groups: GroupDto[] = [];
  userID = '';
  loading = true;
  titleTest = 'Test Title';

  constructor(private recommendationService: RecommendationService,
              private activatedRouter: ActivatedRoute,
              private router: Router
  ) { }

  ngOnInit(): void {
    this.userID = this.activatedRouter.snapshot.paramMap.get('id');

    this.recommendationService.getUserGroupRecommendations$(this.userID).subscribe(
      recommendations => { console.log(recommendations);
                           this.recommendations = recommendations;
                           console.log(this.recommendations);

                           for (let i = 0; i < this.recommendations.group_recommendations.length; i++) {
                              this.group.id = this.recommendations.group_id_recommendations[i];
                              this.group.name = this.recommendations.group_recommendations[i];
                              this.groups.push(this.group);
        }
                           this.loading = false;
        }, error => {
        console.log(error);
      }
    );

  }

}
