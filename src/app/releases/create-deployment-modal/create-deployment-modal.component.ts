import { Component,Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ReleaseService } from '../release.service';  // Ensure this service is properly imported
import { Observable } from 'rxjs';

@Component({
  selector: 'pm-create-deployment-modal',
  templateUrl: './create-deployment-modal.component.html',
  styleUrls: ['./create-deployment-modal.component.css']
})
export class CreateDeploymentModalComponent implements OnInit {
  artifacts: any[] = [];
  selectedArtifact: any;
  displayedColumns: string[] = ['select', 'artifactName', 'version', 'buildNum', 'buildDateTime'];
  @Input() isOpen: boolean = false;
  @Input() releaseName: string | undefined;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();  // Emit selected artifact

  constructor(private releaseService: ReleaseService) { }

  ngOnInit() {
    if (this.releaseName) {
      this.loadArtifacts(this.releaseName);
    }
  }

  loadArtifacts(releaseName: string) {
    this.releaseService.getReleaseArtifacts(releaseName)
      .subscribe(data => {
        this.artifacts = data.filter(artifact => artifact.status === 'accepted');
      });
  }  

  closeModal() {
    this.close.emit();
  }

  onSubmit() {
    if (this.selectedArtifact) {
      this.save.emit(this.selectedArtifact);
    }
    this.closeModal();
  }
}
