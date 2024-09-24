import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppPagginationComponent } from './app-paggination.component';

describe('AppPagginationComponent', () => {
  let component: AppPagginationComponent;
  let fixture: ComponentFixture<AppPagginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppPagginationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppPagginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
