import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCartComponent } from './viewcart.component';

describe('ViewcartComponent', () => {
  let component: ViewCartComponent;
  let fixture: ComponentFixture<ViewCartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewCartComponent]
    });
    fixture = TestBed.createComponent(ViewCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
