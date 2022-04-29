import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiRouteComponent } from './api-route.component';

describe('ApiRouteComponent', () => {
  let component: ApiRouteComponent;
  let fixture: ComponentFixture<ApiRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApiRouteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
