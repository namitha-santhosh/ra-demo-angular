import { Component, OnInit } from '@angular/core';
import { ReleaseService } from '../release.service';
import { Release } from '../release';
import { CreateEditReleaseComponent } from '../create-edit-release/create-edit-release.component';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-release-list',
  templateUrl: './release-list.component.html',
  styleUrls: ['./release-list.component.css']
})
export class ReleaseListComponent implements OnInit {
  isModalOpen: boolean = false;
  releases: Release[] = [];
  page: number = 1;
  pageSize: number = 10;
  errorMessage: string = '';
  selectedRelease: Release = { name: '', status: '', productionDate: new Date(), qaDate: new Date(), stageDate: new Date(), mainReleaseTicket: '' };
  isEditMode: boolean = false;
  displayedColumns: string[] = ['name', 'status', 'productionDate', 'qaDate', 'stageDate', 'mainReleaseTicket'];

  constructor(private releaseService: ReleaseService, public authService: AuthService) { }

  ngOnInit(): void {
    if (this.authService.hasRole('ROLE_RA')) {
      this.displayedColumns.push('actions');
    }
    this.getReleases();
  }

  getReleases(): void {
    this.releaseService.getAllReleases(this.page, this.pageSize)
      .subscribe({
        next: (releases) => this.releases = releases,
        error: (err) => this.errorMessage = err
      });
  }

  openModal(release?: Release): void {
    if (release) {
      this.selectedRelease = { ...release };
      this.isEditMode = true;
    } else {
      this.selectedRelease = { name: '', status: '', productionDate: new Date(), qaDate: new Date(), stageDate: new Date(), mainReleaseTicket: '' }; // Reset for creating a new release
      this.isEditMode = false;
    }
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.selectedRelease = { name: '', status: '', productionDate: new Date(), qaDate: new Date(), stageDate: new Date(), mainReleaseTicket: '' }; // Reset for creating a new release
    this.isModalOpen = false;
  }

  saveRelease(release: Release): void {
    if (this.isEditMode) {
      this.releaseService.updateRelease(release).subscribe({
        next: () => {
          this.getReleases();
          this.closeModal();
        },
        error: (err) => this.errorMessage = err
      });
    } else {
      this.releaseService.createRelease(release).subscribe({
        next: () => {
          this.getReleases();
          this.closeModal();
        },
        error: (err) => this.errorMessage = err
      });
    }
  }

  deleteRelease(release:Release): void {
    if (release && confirm('Are you sure you want to delete this release?')) {
      this.releaseService.deleteRelease(release.name).subscribe({
        next: () => {
          this.getReleases();
        },
        error: (error) => {
          this.errorMessage = 'Error deleting release';
          console.error(error);
        }
      });
    }
  }
}
