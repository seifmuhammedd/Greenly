import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSpecificLicenceComponent } from './manage-specific-licence.component';

describe('ManageSpecificLicenceComponent', () => {
  let component: ManageSpecificLicenceComponent;
  let fixture: ComponentFixture<ManageSpecificLicenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageSpecificLicenceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageSpecificLicenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
