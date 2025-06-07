import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSpecificProductComponent } from './edit-specific-product.component';

describe('EditSpecificProductComponent', () => {
  let component: EditSpecificProductComponent;
  let fixture: ComponentFixture<EditSpecificProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditSpecificProductComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditSpecificProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
