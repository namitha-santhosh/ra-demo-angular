import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditReleaseComponent } from './create-edit-release.component';

describe('CreateEditReleaseComponent', () => {
  let component: CreateEditReleaseComponent;
  let fixture: ComponentFixture<CreateEditReleaseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateEditReleaseComponent]
    });
    fixture = TestBed.createComponent(CreateEditReleaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
