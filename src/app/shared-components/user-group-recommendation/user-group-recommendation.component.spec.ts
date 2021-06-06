import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGroupRecommendationComponent } from './user-group-recommendation.component';

describe('UserGroupRecommendationComponent', () => {
  let component: UserGroupRecommendationComponent;
  let fixture: ComponentFixture<UserGroupRecommendationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserGroupRecommendationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGroupRecommendationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
