import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleaseGoNoGoComponent } from './release-go-no-go.component';

describe('ReleaseGoNoGoComponent', () => {
  let component: ReleaseGoNoGoComponent;
  let fixture: ComponentFixture<ReleaseGoNoGoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReleaseGoNoGoComponent]
    });
    fixture = TestBed.createComponent(ReleaseGoNoGoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
