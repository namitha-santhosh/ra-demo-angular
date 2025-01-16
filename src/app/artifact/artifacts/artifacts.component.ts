import { Component, OnInit } from '@angular/core';
import { ArtifactService } from '../artifact.service';
import { Artifact } from '../artifact';

@Component({
  selector: 'pm-artifacts',
  templateUrl: './artifacts.component.html',
  styleUrls: ['./artifacts.component.css']
})
export class ArtifactsComponent implements OnInit {
  artifactReleaseData: any[] = [];
  page: number = 1;
  pageSize: number = 10;
  errorMessage: string = '';
  displayedColumns: string[] = ['name', 'releaseName', 'version', 'buildNum', 'referenceNumber', 'buildDateTime', 'status'];

  constructor(private artifactService: ArtifactService) { }

  ngOnInit(): void {
    this.getArtifacts();
  }

  getArtifacts(): void {
    this.artifactService.getAllArtifacts(this.page, this.pageSize)
      .subscribe({
        next: (artifacts) => {
          this.artifactReleaseData = this.flattenArtifactData(artifacts);
        },
        error: (err) => this.errorMessage = err
      });
  }

  flattenArtifactData(artifacts: Artifact[]): any[] {
    const flattenedData: any[] = [];
    artifacts.forEach(artifact => {
      artifact.releases.forEach(release => {
        flattenedData.push({
          name: artifact.name,
          releaseName: release.releaseName,
          status: release.status,
          version: release.version,
          buildNum: release.buildNum,
          referenceNumber: release.referenceNumber,
          buildDateTime: release.buildDateTime
        });
      });
    });
    return flattenedData;
  }
}
