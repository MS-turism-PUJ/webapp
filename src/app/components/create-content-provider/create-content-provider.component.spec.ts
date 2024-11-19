import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateContentProviderComponent } from './create-content-provider.component';

describe('CreateContentProviderComponent', () => {
  let component: CreateContentProviderComponent;
  let fixture: ComponentFixture<CreateContentProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateContentProviderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateContentProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
