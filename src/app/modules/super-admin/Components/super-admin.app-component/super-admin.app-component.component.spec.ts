import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperAdminAppComponentComponent } from './super-admin.app-component.component';

describe('SuperAdminAppComponentComponent', () => {
  let component: SuperAdminAppComponentComponent;
  let fixture: ComponentFixture<SuperAdminAppComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuperAdminAppComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuperAdminAppComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
