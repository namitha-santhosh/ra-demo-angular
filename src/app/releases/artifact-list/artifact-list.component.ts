import { Component, OnInit, Input } from '@angular/core';
import { ReleaseService } from '../release.service';

@Component({
  selector: 'app-artifact-list',
  templateUrl: './artifact-list.component.html',
  styleUrls: ['./artifact-list.component.css']
})
export class ArtifactListComponent implements OnInit {
  @Input() releaseName!: string;
  acceptedArtifacts: any[] = [];
  pendingArtifacts: any[] = [];
  removedArtifacts: any[] = [];
  errorMessage: string | undefined;
  displayedColumns: string[] = ['name', 'version', 'buildNum', 'referenceNumber', 'buildDateTime', 'actions'];

  constructor(private releaseService: ReleaseService) {}

  ngOnInit(): void {
    if (this.releaseName) {
      this.fetchArtifacts(this.releaseName);
    }
  }

  fetchArtifacts(releaseName: string): void {
    this.releaseService.getReleaseArtifacts(releaseName).subscribe(
      (artifacts) => {
        this.acceptedArtifacts = artifacts.filter(artifact => artifact.status === 'accepted');
        this.pendingArtifacts = artifacts.filter(artifact => artifact.status === 'pending');
        this.removedArtifacts = artifacts.filter(artifact => artifact.status === 'removed');
      },
      (error) => {
        this.errorMessage = 'Error fetching artifacts';
        console.error(error);
      }
    );
  }

  onDelete(artifact: any): void {
    if (this.releaseName) {
      this.releaseService.deleteArtifactFromRelease(this.releaseName, artifact.artifactName).subscribe(
        () => {
          console.log(`Deleted artifact: ${artifact.artifactName}`);
          this.fetchArtifacts(this.releaseName);
        },
        (error) => {
          console.error('Error deleting artifact:', error);
          this.errorMessage = 'Error deleting artifact';
        }
      );
    }
  }

  onAdd(artifact: any): void {
    if (this.releaseName) {
      const updateData = {
        status: 'accepted'
      };
      this.releaseService.patchArtifact(this.releaseName, artifact.artifactName, updateData).subscribe(
        () => {
          console.log(`Added artifact with status "accepted": ${artifact.artifactName}`);
          this.fetchArtifacts(this.releaseName);  
        },
        (error) => {
          console.error('Error adding artifact:', error);
          this.errorMessage = 'Error adding artifact';
        }
      );
    }  
  }
}
