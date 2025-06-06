import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageLicencesComponent } from './manage-licences.component';

describe('ManageLicencesComponent', () => {
  let component: ManageLicencesComponent;
  let fixture: ComponentFixture<ManageLicencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageLicencesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageLicencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
