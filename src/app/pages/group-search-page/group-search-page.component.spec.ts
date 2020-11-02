import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupSearchPageComponent } from './group-search-page.component';

describe('GroupSearchPageComponent', () => {
  let component: GroupSearchPageComponent;
  let fixture: ComponentFixture<GroupSearchPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupSearchPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupSearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
