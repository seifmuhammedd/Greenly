import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageLoansComponent } from './manage-loans.component';

describe('ManageLoansComponent', () => {
  let component: ManageLoansComponent;
  let fixture: ComponentFixture<ManageLoansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageLoansComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageLoansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
