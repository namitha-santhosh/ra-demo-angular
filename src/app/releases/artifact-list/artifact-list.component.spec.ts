import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtifactListComponent } from './artifact-list.component';

describe('ArtifactListComponent', () => {
  let component: ArtifactListComponent;
  let fixture: ComponentFixture<ArtifactListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArtifactListComponent]
    });
    fixture = TestBed.createComponent(ArtifactListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
