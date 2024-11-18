import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoToDashboardComponent } from './go-to-dashboard.component';

describe('GoToDashboardComponent', () => {
  let component: GoToDashboardComponent;
  let fixture: ComponentFixture<GoToDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoToDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoToDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
