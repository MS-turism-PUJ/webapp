import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderScreenComponent } from './provider-screen.component';

describe('ProviderScreenComponent', () => {
  let component: ProviderScreenComponent;
  let fixture: ComponentFixture<ProviderScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProviderScreenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProviderScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
