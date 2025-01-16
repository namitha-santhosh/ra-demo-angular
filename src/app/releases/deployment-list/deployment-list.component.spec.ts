import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeploymentListComponent } from './deployment-list.component';

describe('DeploymentListComponent', () => {
  let component: DeploymentListComponent;
  let fixture: ComponentFixture<DeploymentListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeploymentListComponent]
    });
    fixture = TestBed.createComponent(DeploymentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
