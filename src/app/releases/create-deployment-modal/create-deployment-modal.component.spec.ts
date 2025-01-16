import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDeploymentModalComponent } from './create-deployment-modal.component';

describe('CreateDeploymentModalComponent', () => {
  let component: CreateDeploymentModalComponent;
  let fixture: ComponentFixture<CreateDeploymentModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateDeploymentModalComponent]
    });
    fixture = TestBed.createComponent(CreateDeploymentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
