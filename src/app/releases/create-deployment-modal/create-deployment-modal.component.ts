import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ReleaseService } from '../release.service';
import { Observable } from 'rxjs';
import { DeploymentService } from '../deployment.service';

@Component({
  selector: 'pm-create-deployment-modal',
  templateUrl: './create-deployment-modal.component.html',
  styleUrls: ['./create-deployment-modal.component.css']
})
export class CreateDeploymentModalComponent implements OnInit {
  artifacts: any[] = [];
  selectedArtifact: any;
  environmentName: string = ''; // New variable to hold environment name
  displayedColumns: string[] = ['select', 'artifactName', 'version', 'buildNum', 'buildDateTime'];
  @Input() isOpen: boolean = false;
  @Input() releaseName!: string;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  constructor(private releaseService: ReleaseService, private deploymentService: DeploymentService) { }

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
    const selectedArtifacts = this.artifacts
      .filter(artifact => artifact.selected)
      .map(artifact => ({
        name: artifact.artifactName,
        version: artifact.version
      }));

    if (!this.environmentName || selectedArtifacts.length === 0) {
      alert("Please select an environment and at least one artifact.");
      return;
    }

    const payload = {
      deployEnv: this.environmentName,
      appName: selectedArtifacts[0].name,
      appVersion: selectedArtifacts[0].version
    };

    this.deploymentService.createDeployment(this.releaseName, payload).subscribe({
      next: () => {
        this.save.emit();
        this.closeModal();
      },
      error: (error) => {
        console.error("Error creating deployment:", error);
      }
    });
  }
}
