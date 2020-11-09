import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePrivatePostComponent } from './create-private-post.component';

describe('CreatePrivatePostComponent', () => {
  let component: CreatePrivatePostComponent;
  let fixture: ComponentFixture<CreatePrivatePostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePrivatePostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePrivatePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
