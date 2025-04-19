import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiaryLicenceComponent } from './apiary-licence.component';

describe('ApiaryLicenceComponent', () => {
  let component: ApiaryLicenceComponent;
  let fixture: ComponentFixture<ApiaryLicenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiaryLicenceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApiaryLicenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
