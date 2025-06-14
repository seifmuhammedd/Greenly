import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageOrderesComponent } from './manage-orderes.component';

describe('ManageOrderesComponent', () => {
  let component: ManageOrderesComponent;
  let fixture: ComponentFixture<ManageOrderesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageOrderesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageOrderesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
