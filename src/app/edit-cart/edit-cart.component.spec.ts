import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCartComponent } from './edit-cart.component';

describe('EditCartComponent', () => {
  let component: EditCartComponent;
  let fixture: ComponentFixture<EditCartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditCartComponent]
    });
    fixture = TestBed.createComponent(EditCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
