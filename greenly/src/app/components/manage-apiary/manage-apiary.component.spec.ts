import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageApiaryComponent } from './manage-apiary.component';

describe('ManageApiaryComponent', () => {
  let component: ManageApiaryComponent;
  let fixture: ComponentFixture<ManageApiaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageApiaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageApiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
