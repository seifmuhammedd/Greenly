import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageLoanComponent } from './manage-loan.component';

describe('ManageLoanComponent', () => {
  let component: ManageLoanComponent;
  let fixture: ComponentFixture<ManageLoanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageLoanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
