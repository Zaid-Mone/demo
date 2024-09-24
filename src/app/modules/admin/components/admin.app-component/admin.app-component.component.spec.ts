import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAppComponentComponent } from './admin.app-component.component';

describe('AdminAppComponentComponent', () => {
  let component: AdminAppComponentComponent;
  let fixture: ComponentFixture<AdminAppComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAppComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminAppComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
