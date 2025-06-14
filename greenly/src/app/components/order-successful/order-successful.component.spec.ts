import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSuccessfulComponent } from './order-successful.component';

describe('OrderSuccessfulComponent', () => {
  let component: OrderSuccessfulComponent;
  let fixture: ComponentFixture<OrderSuccessfulComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderSuccessfulComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrderSuccessfulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
